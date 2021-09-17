package dev.kurama.api.core.facade;

import dev.kurama.api.core.constant.SecurityConstant;
import dev.kurama.api.core.domain.User;
import dev.kurama.api.core.domain.UserPrincipal;
import dev.kurama.api.core.domain.excerpts.AuthenticatedUserExcerpt;
import dev.kurama.api.core.exception.domain.EmailExistsException;
import dev.kurama.api.core.exception.domain.UserLockedException;
import dev.kurama.api.core.exception.domain.UsernameExistsException;
import dev.kurama.api.core.hateoas.assembler.UserModelAssembler;
import dev.kurama.api.core.hateoas.input.LoginInput;
import dev.kurama.api.core.hateoas.input.SignupInput;
import dev.kurama.api.core.mapper.UserMapper;
import dev.kurama.api.core.service.UserService;
import dev.kurama.api.core.utility.JWTTokenProvider;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationFacade {

  @NonNull
  private final UserService userService;

  @NonNull
  private final UserMapper userMapper;

  @NonNull
  private final UserModelAssembler userModelAssembler;

  @NonNull
  private final AuthenticationManager authenticationManager;

  @NonNull
  private final JWTTokenProvider jwtTokenProvider;


  public AuthenticatedUserExcerpt signup(SignupInput signupInput) throws UsernameExistsException, EmailExistsException {
    var user = userService
      .signup(signupInput.getUsername(), signupInput.getPassword(), signupInput.getEmail(),
        signupInput.getFirstname(), signupInput.getLastname());
    return authenticateUser(user);
  }

  public AuthenticatedUserExcerpt login(LoginInput loginInput) throws UserLockedException {
    authenticate(loginInput.getUsername(), loginInput.getPassword());
    var user = userService.findUserByUsername(loginInput.getUsername())
      .orElseThrow(() -> new UsernameNotFoundException(loginInput.getUsername()));
    if (user.isLocked()) {
      throw new UserLockedException(loginInput.getUsername());
    }
    return authenticateUser(user);
  }

  private AuthenticatedUserExcerpt authenticateUser(User user) {
    UserPrincipal userPrincipal = new UserPrincipal(user);
    var token = jwtTokenProvider.generateJWTToken(userPrincipal);
    SecurityContextHolder.getContext().setAuthentication(jwtTokenProvider.getAuthentication(token, null));

    return AuthenticatedUserExcerpt.builder()
      .userModel(userModelAssembler.toModel(userMapper.userToUserModel(user)))
      .headers(getJwtHeader(new UserPrincipal(user)))
      .build();
  }


  private HttpHeaders getJwtHeader(UserPrincipal userPrincipal) {
    var headers = new HttpHeaders();
    headers.add(SecurityConstant.JWT_TOKEN_HEADER, jwtTokenProvider.generateJWTToken(userPrincipal));
    return headers;
  }

  private void authenticate(String username, String password) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
  }
}

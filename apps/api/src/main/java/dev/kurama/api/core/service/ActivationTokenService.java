package dev.kurama.api.core.service;

import static dev.kurama.api.core.constant.ActivationTokenConstant.ACTIVATION_TOKEN_DELAY;
import static dev.kurama.api.core.constant.ActivationTokenConstant.ACTIVATION_TOKEN_EXPIRATION_TIME;
import static dev.kurama.api.core.constant.ActivationTokenConstant.ACTIVATION_TOKEN_MAX_ATTEMPTS;

import dev.kurama.api.core.domain.ActivationToken;
import dev.kurama.api.core.domain.User;
import dev.kurama.api.core.exception.domain.ActivationTokenExpiredException;
import dev.kurama.api.core.exception.domain.ActivationTokenRecentException;
import dev.kurama.api.core.exception.domain.ActivationTokenUserMismatchException;
import dev.kurama.api.core.exception.domain.not.found.ActivationTokenNotFoundException;
import dev.kurama.api.core.repository.ActivationTokenRepository;
import java.util.Date;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivationTokenService {

  @NonNull
  private final ActivationTokenRepository activationTokenRepository;

  public ActivationToken createActivationToken(User user) throws ActivationTokenRecentException {
    if (user.getActivationToken() != null) {
      if (user.getActivationToken().getCreated().getTime() > System.currentTimeMillis() - ACTIVATION_TOKEN_DELAY) {
        throw new ActivationTokenRecentException();
      } else {
        activationTokenRepository.delete(user.getActivationToken());
      }
    }
    return ActivationToken.builder().setRandomUUID().attempts(0).created(new Date()).user(user).build();
  }

  public ActivationToken findActivationToken(String token)
    throws ActivationTokenNotFoundException, ActivationTokenExpiredException {
    var activationToken = activationTokenRepository.findById(token)
      .orElseThrow(() -> new ActivationTokenNotFoundException(token));

    if (activationToken.getCreated().getTime() + ACTIVATION_TOKEN_EXPIRATION_TIME < System.currentTimeMillis()) {
      activationTokenRepository.delete(activationToken);
      throw new ActivationTokenExpiredException(token);
    }
    return activationToken;
  }

  public void verifyActivationTokenMatch(ActivationToken token, User user) throws ActivationTokenUserMismatchException {
    if (!user.getId().equals(token.getUser().getId())) {
      token.setAttempts(token.getAttempts() + 1);
      if (token.getAttempts() > ACTIVATION_TOKEN_MAX_ATTEMPTS) {
        activationTokenRepository.delete(token);
      }
      throw new ActivationTokenUserMismatchException(user.getId());
    }
  }
}

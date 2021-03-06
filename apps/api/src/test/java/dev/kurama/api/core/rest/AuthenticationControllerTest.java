package dev.kurama.api.core.rest;

import static dev.kurama.api.core.constant.RestPathConstant.AUTHENTICATION_PATH;
import static dev.kurama.api.core.rest.AuthenticationController.ACTIVATE_PATH;
import static dev.kurama.api.core.rest.AuthenticationController.LOGIN_PATH;
import static dev.kurama.api.core.rest.AuthenticationController.SIGNUP_PATH;
import static dev.kurama.api.core.rest.AuthenticationController.TOKEN_PATH;
import static dev.kurama.api.core.utility.UuidUtils.randomUUID;
import static dev.kurama.support.JsonUtils.asJsonString;
import static org.apache.commons.lang3.RandomStringUtils.randomAlphanumeric;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.kurama.api.core.constant.SecurityConstant;
import dev.kurama.api.core.exception.ExceptionHandlers;
import dev.kurama.api.core.facade.AuthenticationFacade;
import dev.kurama.api.core.hateoas.input.AccountActivationInput;
import dev.kurama.api.core.hateoas.input.LoginInput;
import dev.kurama.api.core.hateoas.input.RequestActivationTokenInput;
import dev.kurama.api.core.hateoas.input.SignupInput;
import dev.kurama.api.core.hateoas.model.AuthenticatedUserModel;
import dev.kurama.api.core.hateoas.model.UserModel;
import dev.kurama.api.core.rest.AuthenticationControllerTest.AuthenticationControllerConfig;
import dev.kurama.api.core.utility.AuthorityUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {AuthenticationController.class})
@Import(AuthenticationControllerConfig.class)
class AuthenticationControllerTest {

  @Autowired
  private AuthenticationFacade facade;

  @Autowired
  private AuthenticationController controller;

  private MockMvc mockMvc;

  @BeforeEach
  void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(controller).setControllerAdvice(new ExceptionHandlers()).build();
  }


  @Test
  void should_signup() throws Exception {
    SignupInput input = SignupInput.builder()
      .firstname(randomAlphanumeric(8))
      .lastname(randomAlphanumeric(8))
      .username(randomAlphanumeric(8))
      .email(randomAlphanumeric(8))
      .build();

    mockMvc.perform(post(AUTHENTICATION_PATH + SIGNUP_PATH).accept(MediaTypes.HAL_FORMS_JSON_VALUE)
      .contentType(MediaType.APPLICATION_JSON)
      .content(asJsonString(input))).andExpect(status().isNoContent());

    verify(facade).signup(input);
  }

  @Test
  void should_login() throws Exception {
    LoginInput input = LoginInput.builder().username(randomAlphanumeric(8)).password(randomAlphanumeric(8)).build();
    UserModel user = UserModel.builder().id(randomUUID()).build();
    String token = randomUUID();
    String refreshToken = randomUUID();
    var headers = new HttpHeaders();
    headers.add(SecurityConstant.JWT_TOKEN_HEADER, token);
    headers.add(SecurityConstant.JWT_REFRESH_TOKEN_HEADER, refreshToken);
    AuthenticatedUserModel expected = AuthenticatedUserModel.builder().userModel(user).headers(headers).build();
    when(facade.login(input)).thenReturn(expected);

    mockMvc.perform(post(AUTHENTICATION_PATH + LOGIN_PATH).accept(MediaTypes.HAL_FORMS_JSON_VALUE)
        .contentType(MediaType.APPLICATION_JSON)
        .content(asJsonString(input)))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.id", equalTo(user.getId())))
      .andExpect(header().string(SecurityConstant.JWT_TOKEN_HEADER, token))
      .andExpect(header().string(SecurityConstant.JWT_REFRESH_TOKEN_HEADER, refreshToken));
  }

  @Test
  void should_refresh_token() throws Exception {
    UserModel user = UserModel.builder().id(randomUUID()).build();
    String token = randomUUID();
    String refreshToken = randomUUID();
    var headers = new HttpHeaders();
    headers.add(SecurityConstant.JWT_TOKEN_HEADER, token);
    headers.add(SecurityConstant.JWT_REFRESH_TOKEN_HEADER, refreshToken);
    AuthenticatedUserModel expected = AuthenticatedUserModel.builder().userModel(user).headers(headers).build();
    when(facade.refreshToken(user.getId())).thenReturn(expected);

    try (MockedStatic<AuthorityUtils> utilities = Mockito.mockStatic(AuthorityUtils.class)) {
      utilities.when(AuthorityUtils::getCurrentUserId).thenReturn(user.getId());

      mockMvc.perform(get(AUTHENTICATION_PATH + TOKEN_PATH).accept(MediaTypes.HAL_FORMS_JSON_VALUE))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id", equalTo(user.getId())))
        .andExpect(header().string(SecurityConstant.JWT_TOKEN_HEADER, token))
        .andExpect(header().string(SecurityConstant.JWT_REFRESH_TOKEN_HEADER, refreshToken));
    }
  }

  @Test
  void should_request_activation_token() throws Exception {
    RequestActivationTokenInput input = RequestActivationTokenInput.builder().email(randomAlphanumeric(8)).build();

    mockMvc.perform(post(AUTHENTICATION_PATH + TOKEN_PATH).accept(MediaTypes.HAL_FORMS_JSON_VALUE)
      .contentType(MediaType.APPLICATION_JSON)
      .content(asJsonString(input))).andExpect(status().isNoContent());

    verify(facade).requestActivationToken(input.getEmail());
  }

  @Test
  void should_activate_account() throws Exception {
    AccountActivationInput input = AccountActivationInput.builder()
      .email(randomAlphanumeric(8))
      .password(randomAlphanumeric(8))
      .token(randomUUID())
      .build();

    mockMvc.perform(post(AUTHENTICATION_PATH + ACTIVATE_PATH).accept(MediaTypes.HAL_FORMS_JSON_VALUE)
      .contentType(MediaType.APPLICATION_JSON)
      .content(asJsonString(input))).andExpect(status().isNoContent());

    verify(facade).activateAccount(input);
  }

  @TestConfiguration
  protected static class AuthenticationControllerConfig {

    @Bean
    public AuthenticationFacade authenticationFacade() {
      return Mockito.mock(AuthenticationFacade.class);
    }
  }
}

package dev.kurama.api.core.mapper;

import static dev.kurama.api.core.utility.UuidUtils.randomUUID;
import static org.apache.commons.lang3.RandomStringUtils.randomAlphanumeric;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNull;

import dev.kurama.api.core.domain.User;
import dev.kurama.api.core.domain.UserPreferences;
import dev.kurama.api.core.hateoas.model.UserPreferencesModel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

class UserPreferencesMapperTest {

  private UserPreferencesMapper mapper;

  @BeforeEach
  void setUp() {
    mapper = Mappers.getMapper(UserPreferencesMapper.class);
  }

  @Test
  void should_return_null_when_user_preferences_is_null() {
    assertNull(mapper.userPreferencesToUserPreferencesModel(null));
  }

  @Test
  void should_return_null_user_when_user_is_null() {
    UserPreferences userPreferences = UserPreferences.builder().setRandomUUID().build();

    assertNull(mapper.userPreferencesToUserPreferencesModel(userPreferences).getUser());
  }

  @Test
  void user_preferences_to_user_preferences_model() {
    UserPreferences userPreferences = UserPreferences.builder()
      .setRandomUUID()
      .darkMode(true)
      .contentLanguage(randomAlphanumeric(2))
      .user(User.builder().setRandomUUID().username(randomUUID()).build())
      .build();

    UserPreferencesModel actual = mapper.userPreferencesToUserPreferencesModel(userPreferences);

    assertThat(actual).hasFieldOrPropertyWithValue("id", userPreferences.getId())
      .hasFieldOrPropertyWithValue("darkMode", userPreferences.isDarkMode())
      .hasFieldOrPropertyWithValue("contentLanguage", userPreferences.getContentLanguage())
      .extracting("user")
      .hasFieldOrPropertyWithValue("id", userPreferences.getUser().getId())
      .hasFieldOrPropertyWithValue("username", userPreferences.getUser().getUsername());

  }
}

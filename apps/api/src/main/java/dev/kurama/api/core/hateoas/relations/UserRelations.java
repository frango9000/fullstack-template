package dev.kurama.api.core.hateoas.relations;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserRelations {

  public static final String USER_REL = "user";
  public static final String USERS_REL = "users";

  public static final String CURRENT_USER_REL = "current-user";

  public static final String USER_PREFERENCES_REL = "user-preferences";


}

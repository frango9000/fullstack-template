package dev.kurama.api.core.hateoas.relations;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AdministrationRelations {

  public static final String ADMINISTRATION_REL = "administration";
  public static final String USER_MANAGEMENT_ROOT_REL = "user-management";
  public static final String ROLE_MANAGEMENT_ROOT_REL = "role-management";
  public static final String SERVICE_LOGS_REL = "service-logs";
  public static final String GLOBAL_SETTINGS_REL = "global-settings";
}

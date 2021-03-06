package dev.kurama.api.core.authority;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component("RoleAuthority")
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RoleAuthority {

  public static final String ROLE_CREATE = "role:create";
  public static final String ROLE_READ = "role:read";
  public static final String ROLE_UPDATE = "role:update";
  public static final String ROLE_UPDATE_CORE = "role:update:core";
  public static final String ROLE_DELETE = "role:delete";

}

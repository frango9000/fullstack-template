package dev.kurama.api.core.authority;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component("AdminAuthority")
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AdminAuthority {

  public static final String ADMIN_ROOT = "admin:root";
  public static final String ADMIN_USER_MANAGEMENT_ROOT = "admin:user-management:root";
  public static final String ADMIN_ROLE_MANAGEMENT_ROOT = "admin:role-management:root";

}

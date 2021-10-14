package dev.kurama.api.core.authority;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GlobalSettingsAuthority {

  public static final String GLOBAL_SETTINGS_READ = "global-settings:read";
  public static final String GLOBAL_SETTINGS_UPDATE = "global-settings:update";

}

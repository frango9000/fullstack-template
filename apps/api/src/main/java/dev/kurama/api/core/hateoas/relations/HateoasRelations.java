package dev.kurama.api.core.hateoas.relations;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HateoasRelations {

  public static final String DEFAULT = "default";
  public static final String SELF = "self";
  public static final String ROOT_REL = "root";
  public static final String WEBSOCKET_REL = "ws";
}

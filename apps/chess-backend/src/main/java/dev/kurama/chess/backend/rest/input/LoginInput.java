package dev.kurama.chess.backend.rest.input;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
@Builder
public class LoginInput {

  @NonNull
  private String username;
  @NonNull
  private String password;
}

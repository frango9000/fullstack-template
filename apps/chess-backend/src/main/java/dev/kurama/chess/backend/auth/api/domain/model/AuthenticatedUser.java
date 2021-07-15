package dev.kurama.chess.backend.auth.api.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpHeaders;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticatedUser {

  private UserModel userModel;
  private HttpHeaders headers;
}
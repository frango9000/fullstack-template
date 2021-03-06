package dev.kurama.api.core.message;

import static dev.kurama.api.core.constant.WebsocketConstant.ROOT_WEBSOCKET_CHANNEL;
import static java.lang.String.format;

import dev.kurama.api.core.event.domain.UserPreferencesChangedEvent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserPreferencesChangedMessageSender {

  public static final String USERS_PREFERENCES_CHANGED_CHANNEL = ROOT_WEBSOCKET_CHANNEL + "/user-preferences/%s";

  @NonNull
  private final SimpMessagingTemplate template;

  public void sendUserPreferencesChangedMessage(@NonNull UserPreferencesChangedEvent event) {
    template.convertAndSend(format(USERS_PREFERENCES_CHANGED_CHANNEL, event.getUserPreferencesId()), event);
  }

}

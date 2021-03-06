package dev.kurama.api.core.hateoas.processor;

import static dev.kurama.api.core.authority.ServiceLogsAuthority.SERVICE_LOGS_DELETE;
import static dev.kurama.api.core.constant.RestPathConstant.SERVICE_LOGS_PATH;
import static dev.kurama.api.core.hateoas.relations.HateoasRelations.DEFAULT;
import static dev.kurama.api.core.hateoas.relations.HateoasRelations.SELF;
import static org.apache.commons.lang3.RandomStringUtils.randomAlphanumeric;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.hateoas.MediaTypes.HAL_FORMS_JSON;

import dev.kurama.api.core.hateoas.model.ServiceLogsModel;
import dev.kurama.api.core.utility.AuthorityUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.http.HttpMethod;

class ServiceLogsModelProcessorTest {

  private MockedStatic<AuthorityUtils> authorityUtils;

  private ServiceLogsModelProcessor processor;

  private ServiceLogsModel model;

  @BeforeEach
  void setUp() {
    processor = new ServiceLogsModelProcessor();

    authorityUtils = Mockito.mockStatic(AuthorityUtils.class);

    model = ServiceLogsModel.builder().logs(randomAlphanumeric(8)).build();
  }

  @AfterEach
  void tearDown() {
    authorityUtils.close();
  }

  @Test
  void should_have_self_link() {
    ServiceLogsModel actual = processor.process(model);

    assertThat(actual.getLinks()).hasSize(1);
    assertThat(actual.getLink(SELF)).isPresent()
      .hasValueSatisfying(link -> assertThat(link.getHref()).isEqualTo(SERVICE_LOGS_PATH));

  }

  @Test
  void should_have_default_affordance() {
    ServiceLogsModel actual = processor.process(model);

    assertThat(actual.getRequiredLink(SELF).getAffordances()).hasSize(2)
      .extracting(affordance -> affordance.getAffordanceModel(HAL_FORMS_JSON))
      .extracting("name", "httpMethod")
      .anySatisfy(reqs -> assertThat(reqs.toList()).contains(DEFAULT, HttpMethod.HEAD))
      .anySatisfy(reqs -> assertThat(reqs.toList()).contains("getServiceLogs", HttpMethod.GET));
  }

  @Test
  void should_have_delete_affordance_if_user_has_service_logs_delete_authority() {
    authorityUtils.when(() -> AuthorityUtils.hasAuthority(SERVICE_LOGS_DELETE)).thenReturn(true);

    ServiceLogsModel actual = processor.process(model);

    assertThat(actual.getRequiredLink(SELF).getAffordances()).hasSize(3)
      .extracting(affordance -> affordance.getAffordanceModel(HAL_FORMS_JSON))
      .extracting("name", "httpMethod")
      .anySatisfy(reqs -> assertThat(reqs.toList()).contains(DEFAULT, HttpMethod.HEAD))
      .anySatisfy(reqs -> assertThat(reqs.toList()).contains("getServiceLogs", HttpMethod.GET))
      .anySatisfy(reqs -> assertThat(reqs.toList()).contains("deleteServiceLogs", HttpMethod.DELETE));

  }
}

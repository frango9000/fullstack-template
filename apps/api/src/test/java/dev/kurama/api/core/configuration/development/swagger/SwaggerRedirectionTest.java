package dev.kurama.api.core.configuration.development.swagger;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {SwaggerRedirection.class})
@ActiveProfiles(profiles = "development")
class SwaggerRedirectionTest {

  @Autowired
  private SwaggerRedirection controller;

  private MockMvc mockMvc;

  @BeforeEach
  void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(controller)
      .build();
  }

  @Test
  void should_redirect_to_hal_explorer() throws Exception {
    mockMvc.perform(
        get("/swagger-ui"))
      .andExpect(status().is3xxRedirection())
      .andExpect(redirectedUrl("/swagger-ui/index.html"));
  }
}
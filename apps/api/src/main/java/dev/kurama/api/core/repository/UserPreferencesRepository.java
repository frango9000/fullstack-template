package dev.kurama.api.core.repository;

import dev.kurama.api.core.domain.UserPreferences;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPreferencesRepository extends JpaRepository<UserPreferences, String> {

  Optional<UserPreferences> findUserPreferencesByUserId(String userId);

}

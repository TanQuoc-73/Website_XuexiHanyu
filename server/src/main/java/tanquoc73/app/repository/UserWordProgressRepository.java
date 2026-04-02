package tanquoc73.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tanquoc73.app.entity.UserWordProgress;
import java.util.Optional;

public interface UserWordProgressRepository extends JpaRepository<UserWordProgress, Long> {
    Optional<UserWordProgress> findByUserIdAndWordId(Long userId, Long wordId);
}

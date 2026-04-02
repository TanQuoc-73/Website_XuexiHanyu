package tanquoc73.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tanquoc73.app.entity.QuizHistory;
import java.util.List;

public interface QuizHistoryRepository extends JpaRepository<QuizHistory, Long> {
    List<QuizHistory> findByUserId(Long userId);
    List<QuizHistory> findByUserIdAndWordId(Long userId, Long wordId);
}

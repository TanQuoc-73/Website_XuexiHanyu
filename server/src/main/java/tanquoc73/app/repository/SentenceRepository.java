package tanquoc73.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tanquoc73.app.entity.Sentence;

public interface SentenceRepository extends JpaRepository<Sentence, Long> {
}

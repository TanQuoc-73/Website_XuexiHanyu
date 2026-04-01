package tanquoc73.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tanquoc73.app.entity.Word;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    List<Word> findByHskLevel(String hskLevel);
    List<Word> findByCategory(String category);
}

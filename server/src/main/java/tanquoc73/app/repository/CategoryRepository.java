package tanquoc73.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tanquoc73.app.entity.Category;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
}

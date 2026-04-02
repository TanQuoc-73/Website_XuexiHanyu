package tanquoc73.app.seed;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tanquoc73.app.entity.Category;
import tanquoc73.app.entity.Sentence;
import tanquoc73.app.entity.Word;
import tanquoc73.app.repository.CategoryRepository;
import tanquoc73.app.repository.SentenceRepository;
import tanquoc73.app.repository.WordRepository;

import java.io.File;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class HskDatasetSeeder implements CommandLineRunner {

    private final WordRepository wordRepository;
    private final CategoryRepository categoryRepository;
    private final SentenceRepository sentenceRepository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Path to the dataset relative to the project root
        // Using File instead of getResourceAsStream as the file is outside classpath
        File jsonFile = new File("../dataset/hsk/complete.min.json");
        
        if (!jsonFile.exists()) {
            log.warn("Dataset file NOT found at: {}. Please ensure complete.min.json exists.", jsonFile.getAbsolutePath());
            return;
        }

        log.info("Reading HSK dataset from: {}", jsonFile.getAbsolutePath());
        try (InputStream is = new java.io.FileInputStream(jsonFile)) {
            List<Map<String, Object>> dataset = objectMapper.readValue(is, new TypeReference<>() {});

            if (dataset == null || dataset.isEmpty()) {
                log.info("Dataset is empty. Skipping seeding.");
                return;
            }

            // Ensure a default category exists if one isn't found in data
            Category defaultCategory = categoryRepository.findByName("HSK Vocabulary")
                    .orElseGet(() -> categoryRepository.save(Category.builder().name("HSK Vocabulary").build()));

            int count = 0;
            for (Map<String, Object> item : dataset) {
                String hanzi = (String) item.get("hanzi");
                String pinyin = (String) item.get("pinyin");
                String meaning = (String) item.get("meaning");
                Integer level = (Integer) item.get("level");

                // Duplicate check
                if (wordRepository.findByHanziAndPinyin(hanzi, pinyin).isEmpty()) {
                    Word word = Word.builder()
                            .hanzi(hanzi)
                            .pinyin(pinyin)
                            .meaningEn(meaning)
                            .meaningVi("Chờ cập nhật") // Default VI meaning
                            .hskLevel(level)
                            .category(defaultCategory)
                            .build();

                    word = wordRepository.save(word);

                    // Create placeholder sentence
                    Sentence sentence = Sentence.builder()
                            .word(word)
                            .sentence("这是一个关于 " + hanzi + " 的例子。")
                            .pinyin("Zhè shì yīgè guānyú " + pinyin + " de lìzi.")
                            .translationEn("This is an example about " + meaning + ".")
                            .translationVi("Đây là một ví dụ về " + hanzi + ".")
                            .build();

                    sentenceRepository.save(sentence);
                    count++;
                }
            }
            log.info("HSK Seeding complete. Added {} new words.", count);

        } catch (Exception e) {
            log.error("Failed to seed HSK dataset: {}", e.getMessage(), e);
        }
    }
}

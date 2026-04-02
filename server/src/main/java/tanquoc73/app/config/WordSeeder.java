package tanquoc73.app.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tanquoc73.app.entity.Category;
import tanquoc73.app.entity.Sentence;
import tanquoc73.app.entity.Word;
import tanquoc73.app.repository.CategoryRepository;
import tanquoc73.app.repository.WordRepository;

import java.util.ArrayList;

@Configuration
@RequiredArgsConstructor
public class WordSeeder {

    @Bean
    CommandLineRunner initDatabase(WordRepository wordRepository, CategoryRepository categoryRepository) {
        return args -> {
            if (wordRepository.count() == 0) {
                seedWord(wordRepository, categoryRepository, "我", "wǒ", "Tôi, mình, tớ", "I, me", 1, "Pronoun",
                    "我是越南人。", "Wǒ shì yuènán rén.", "Tôi là người Việt Nam.", "I am Vietnamese.");
                
                seedWord(wordRepository, categoryRepository, "你", "nǐ", "Bạn, anh, chị", "You", 1, "Pronoun",
                    "你叫什么名字？", "Nǐ jiào shénme míngzi?", "Bạn tên là gì?", "What is your name?");
                
                seedWord(wordRepository, categoryRepository, "学习", "xuéxí", "Học, học tập", "To study, to learn", 1, "Verb",
                    "我在学习汉语。", "Wǒ zài xuéxí hànyǔ.", "Tôi đang học tiếng Hán.", "I am studying Chinese.");
                
                seedWord(wordRepository, categoryRepository, "汉字", "hànzì", "Hán tự, chữ Hán", "Chinese characters", 1, "Noun",
                    "汉字很有意思。", "Hànzì hěn yǒu yìsi.", "Chữ Hán rất thú vị.", "Chinese characters are very interesting.");
                
                seedWord(wordRepository, categoryRepository, "谢谢", "xièxie", "Cảm ơn", "Thank you", 1, "Greeting",
                    "谢谢你的 giúp đỡ！", "Xièxie nǐ de bāngzhù!", "Cảm ơn sự giúp đỡ của bạn!", "Thank you for your help!");

                System.out.println("Seeded HSK 1 words into database with categories and sentences.");
            }
        };
    }

    private void seedWord(WordRepository wordRepo, CategoryRepository catRepo, 
                          String hanzi, String pinyin, String meaningVi, String meaningEn, 
                          int level, String categoryName,
                          String exHanzi, String exPinyin, String exVi, String exEn) {
        
        Category category = catRepo.findByName(categoryName)
                .orElseGet(() -> catRepo.save(Category.builder().name(categoryName).build()));

        Word word = Word.builder()
                .hanzi(hanzi)
                .pinyin(pinyin)
                .meaningVi(meaningVi)
                .meaningEn(meaningEn)
                .hskLevel(level)
                .category(category)
                .sentences(new ArrayList<>())
                .build();

        Sentence sentence = Sentence.builder()
                .word(word)
                .sentence(exHanzi)
                .pinyin(exPinyin)
                .translationVi(exVi)
                .translationEn(exEn)
                .build();
        
        word.getSentences().add(sentence);
        wordRepo.save(word);
    }
}

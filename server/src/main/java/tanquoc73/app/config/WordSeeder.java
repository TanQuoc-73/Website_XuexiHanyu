package tanquoc73.app.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tanquoc73.app.entity.Word;
import tanquoc73.app.repository.WordRepository;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WordSeeder {

    @Bean
    CommandLineRunner initDatabase(WordRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                    Word.builder()
                        .hanzi("我")
                        .pinyin("wǒ")
                        .meaningVi("Tôi, mình, tớ")
                        .meaningEn("I, me")
                        .exampleSentence("我是越南人。")
                        .examplePinyin("Wǒ shì yuènán rén.")
                        .exampleVi("Tôi là người Việt Nam.")
                        .exampleEn("I am Vietnamese.")
                        .hskLevel("1")
                        .category("Pronoun")
                        .build(),
                    Word.builder()
                        .hanzi("你")
                        .pinyin("nǐ")
                        .meaningVi("Bạn, anh, chị")
                        .meaningEn("You")
                        .exampleSentence("你叫什么名字？")
                        .examplePinyin("Nǐ jiào shénme míngzi?")
                        .exampleVi("Bạn tên là gì?")
                        .exampleEn("What is your name?")
                        .hskLevel("1")
                        .category("Pronoun")
                        .build(),
                    Word.builder()
                        .hanzi("学习")
                        .pinyin("xuéxí")
                        .meaningVi("Học, học tập")
                        .meaningEn("To study, to learn")
                        .exampleSentence("我在学习汉语。")
                        .examplePinyin("Wǒ zài xuéxí hànyǔ.")
                        .exampleVi("Tôi đang học tiếng Hán.")
                        .exampleEn("I am studying Chinese.")
                        .hskLevel("1")
                        .category("Verb")
                        .build(),
                    Word.builder()
                        .hanzi("汉字")
                        .pinyin("hànzì")
                        .meaningVi("Hán tự, chữ Hán")
                        .meaningEn("Chinese characters")
                        .exampleSentence("汉字很有意思。")
                        .examplePinyin("Hànzì hěn yǒu yìsi.")
                        .exampleVi("Chữ Hán rất thú vị.")
                        .exampleEn("Chinese characters are very interesting.")
                        .hskLevel("1")
                        .category("Noun")
                        .build(),
                    Word.builder()
                        .hanzi("谢谢")
                        .pinyin("xièxie")
                        .meaningVi("Cảm ơn")
                        .meaningEn("Thank you")
                        .exampleSentence("谢谢你的帮助！")
                        .examplePinyin("Xièxie nǐ de bāngzhù!")
                        .exampleVi("Cảm ơn sự giúp đỡ của bạn!")
                        .exampleEn("Thank you for your help!")
                        .hskLevel("1")
                        .category("Greeting")
                        .build()
                ));
                System.out.println("Seeded HSK 1 words into database.");
            }
        };
    }
}

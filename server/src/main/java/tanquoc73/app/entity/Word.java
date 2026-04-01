package tanquoc73.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "words")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String hanzi; // 汉字

    @Column(nullable = false)
    private String pinyin; // Pinyin

    @Column(nullable = false)
    private String meaningVi; // Vietnamese meaning

    @Column(nullable = false)
    private String meaningEn; // English meaning

    private String exampleSentence; // Example sentence in Chinese
    private String examplePinyin; // Pinyin for example sentence
    private String exampleVi; // Vietnamese translation of example
    private String exampleEn; // English translation of example

    private String hskLevel; // HSK Level (1-6)
    private String category; // e.g., "Noun", "Verb", "Greeting"
}

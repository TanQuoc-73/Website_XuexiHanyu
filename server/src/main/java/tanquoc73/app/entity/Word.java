package tanquoc73.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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
    private String hanzi;

    @Column(nullable = false)
    private String pinyin;

    @Column(name = "meaning_vi", columnDefinition = "TEXT")
    private String meaningVi;

    @Column(name = "meaning_en", columnDefinition = "TEXT")
    private String meaningEn;

    @Column(name = "hsk_level")
    private Integer hskLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sentence> sentences;

    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserWordProgress> progressList;

    @OneToMany(mappedBy = "word", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<QuizHistory> quizHistories;
}

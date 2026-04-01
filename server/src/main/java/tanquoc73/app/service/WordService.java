package tanquoc73.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tanquoc73.app.entity.Word;
import tanquoc73.app.repository.WordRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;

    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }

    public List<Word> getWordsByHskLevel(String hskLevel) {
        return wordRepository.findByHskLevel(hskLevel);
    }

    public Word getWordById(Long id) {
        return wordRepository.findById(id).orElse(null);
    }

    public Word saveWord(Word word) {
        return wordRepository.save(word);
    }

    public void deleteWord(Long id) {
        wordRepository.deleteById(id);
    }
}

package tanquoc73.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tanquoc73.app.entity.Word;
import tanquoc73.app.service.WordService;

import java.util.List;

@RestController
@RequestMapping("/api/words")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend to call API
public class WordController {

    private final WordService wordService;

    @GetMapping
    public ResponseEntity<List<Word>> getAllWords() {
        return ResponseEntity.ok(wordService.getAllWords());
    }

    @GetMapping("/hsk/{level}")
    public ResponseEntity<List<Word>> getWordsByHskLevel(@PathVariable String level) {
        return ResponseEntity.ok(wordService.getWordsByHskLevel(level));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Word> getWordById(@PathVariable Long id) {
        Word word = wordService.getWordById(id);
        if (word != null) {
            return ResponseEntity.ok(word);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Word> createWord(@RequestBody Word word) {
        return ResponseEntity.ok(wordService.saveWord(word));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWord(@PathVariable Long id) {
        wordService.deleteWord(id);
        return ResponseEntity.noContent().build();
    }
}

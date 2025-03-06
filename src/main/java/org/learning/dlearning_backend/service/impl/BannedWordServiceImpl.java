package org.learning.dlearning_backend.service.impl;

import com.hankcs.algorithm.AhoCorasickDoubleArrayTrie;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.service.BannedWordService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class BannedWordServiceImpl implements BannedWordService {

    private final AhoCorasickDoubleArrayTrie<String> ahoCorasickTrie = new AhoCorasickDoubleArrayTrie<>();
    @Override
    @PostConstruct
    public void loadBannedWords() {
        try {
            ClassPathResource resource = new ClassPathResource("banned_words.txt");
            List<String> bannedWords = Files.readAllLines(resource.getFile().toPath());
            Map<String , String> map = new HashMap<>();
            for (String word : bannedWords) {
                map.put(word.toLowerCase(), word);
            }
            ahoCorasickTrie.build(map);
        } catch (IOException e) {
            log.error("Lỗi khi đọc file banned_words.txt: ", e);
        }
    }

    @Override
    public boolean containsBannedWord(String text) {
        text = text.toLowerCase();
        List<AhoCorasickDoubleArrayTrie.Hit<String>> hits = ahoCorasickTrie.parseText(text);

        for (AhoCorasickDoubleArrayTrie.Hit<String> hit : hits) {
            String word = hit.value; // từ bị cấm
            String regex = "\\b" + word + "\\b";

            if(text.matches(".*" + regex + ".*")) {
                return true;
            }

        }
        return false;
    }
}

package org.learning.dlearning_backend.service;

public interface BannedWordService {
    void loadBannedWords();
    boolean containsBannedWord(String text);
}

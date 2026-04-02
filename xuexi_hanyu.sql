CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    username VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE words (
    id BIGSERIAL PRIMARY KEY,
    hanzi VARCHAR(50) NOT NULL,
    pinyin VARCHAR(100) NOT NULL,
    meaning_vi TEXT,
    meaning_en TEXT,
    hsk_level INT,
    category_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_words_hanzi ON words(hanzi);
CREATE INDEX idx_words_pinyin ON words(pinyin);
CREATE INDEX idx_words_hsk ON words(hsk_level);

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE sentences (
    id BIGSERIAL PRIMARY KEY,
    word_id BIGINT REFERENCES words(id) ON DELETE CASCADE,
    sentence TEXT,
    pinyin TEXT,
    translation_vi TEXT,
    translation_en TEXT
);

CREATE TABLE user_word_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    word_id BIGINT REFERENCES words(id),
    status VARCHAR(50) DEFAULT 'learning',
    correct_count INT DEFAULT 0,
    wrong_count INT DEFAULT 0,
    next_review TIMESTAMP,
    last_review TIMESTAMP
);

CREATE TABLE quiz_history (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    word_id BIGINT REFERENCES words(id),
    is_correct BOOLEAN,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
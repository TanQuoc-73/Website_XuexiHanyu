-- XUEXI HANYU (🐼 学习汉语) - DATABASE SCHEMA
-- Create database if not exists
-- CREATE DATABASE xuexi_hanyu;

-- Connect to the database
-- \c xuexi_hanyu;

-- 1. Table: users
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: words
CREATE TABLE IF NOT EXISTS words (
    id BIGSERIAL PRIMARY KEY,
    hanzi VARCHAR(255) NOT NULL,
    pinyin VARCHAR(255) NOT NULL,
    meaning_vi VARCHAR(255) NOT NULL,
    meaning_en VARCHAR(255) NOT NULL,
    example_sentence VARCHAR(255),
    example_pinyin VARCHAR(255),
    example_vi VARCHAR(255),
    example_en VARCHAR(255),
    hsk_level VARCHAR(10),
    category VARCHAR(100)
);

-- 3. Initial Seed Data (HSK 1)
INSERT INTO words (hanzi, pinyin, meaning_vi, meaning_en, example_sentence, example_pinyin, example_vi, example_en, hsk_level, category)
VALUES 
('我', 'wǒ', 'Tôi, mình, tớ', 'I, me', '我是越南人。', 'Wǒ shì yuènán rén.', 'Tôi là người Việt Nam.', 'I am Vietnamese.', '1', 'Pronoun'),
('你', 'nǐ', 'Bạn, anh, chị', 'You', '你叫什么名字？', 'Nǐ jiào shénme míngzi?', 'Bạn tên là gì?', 'What is your name?', '1', 'Pronoun'),
('学习', 'xuéxí', 'Học, học tập', 'To study, to learn', '我在学习汉语。', 'Wǒ zài xuéxí hànyǔ.', 'Tôi đang học tiếng Hán.', 'I am studying Chinese.', '1', 'Verb'),
('汉字', 'hànzì', 'Hán tự, chữ Hán', 'Chinese characters', '汉字很有意思。', 'Hànzì hěn yǒu yìsi.', 'Chữ Hán rất thú vị.', 'Chinese characters are very interesting.', '1', 'Noun'),
('谢谢', 'xièxie', 'Cảm ơn', 'Thank you', '谢谢你的帮助！', 'Xièxie nǐ de bāngzhù!', 'Cảm ơn sự giúp đỡ của bạn!', 'Thank you for your help!', '1', 'Greeting')
ON CONFLICT DO NOTHING;

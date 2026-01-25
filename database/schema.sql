-- Climatic Beats Database Schema
-- Tables are auto-created by TypeORM on application startup

CREATE DATABASE IF NOT EXISTS climaticbeats;
USE climaticbeats;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Search history table
CREATE TABLE IF NOT EXISTS search_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    city VARCHAR(100) NOT NULL,
    countryCode VARCHAR(2),
    searchedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_searched_at (searchedAt)
);

-- Recommendation history table
CREATE TABLE IF NOT EXISTS recommendation_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    city VARCHAR(100) NOT NULL,
    weather_condition VARCHAR(50) NOT NULL,
    temperature DOUBLE,
    music_genre VARCHAR(50) NOT NULL,
    recommendedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_recommended_at (recommendedAt)
);


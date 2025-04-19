CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;

DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255), -- bcrypt hash
    role_type CHAR(1) CHECK (role_type IN ('u', 'a')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE listings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    latitude DOUBLE CHECK (latitude >= -90 AND latitude <= 90),
    longitude DOUBLE CHECK (longitude >= -180 AND longitude <= 180),
    user_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, role_type)
VALUES 
('darren', 'darren@example.com', '$2b$12$5jPoH5EaGs8wglzlBoQgbObOUdGXaJ1lkdgzs6NGO2.TG9CsFMjNG', 'a'),
('test', 'test@example.com', '$2b$12$5jPoH5EaGs8wglzlBoQgbObOUdGXaJ1lkdgzs6NGO2.TG9CsFMjNG', 'u'),
('test2', 'test2@example.com', '$2b$12$5jPoH5EaGs8wglzlBoQgbObOUdGXaJ1lkdgzs6NGO2.TG9CsFMjNG', 'u');

INSERT INTO listings (name, latitude, longitude, user_id)
VALUES
('Petronas Towers', 3.1579, 101.7115, 1),
('Marina Bay Sands', 1.2834, 103.8607, 2),
('Komtar Tower', 5.4142, 100.3288, 3),
('Gardens by the Bay', 1.2816, 103.8636, 2),
('Mount Kinabalu', 6.0754, 116.5580, 1);

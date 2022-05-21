DROP DATABASE IF EXISTS ucode_web;

CREATE DATABASE ucode_web;

USE ucode_web;

DROP USER IF EXISTS 'mnosov' @'localhost';
CREATE USER 'mnosov' @'localhost' IDENTIFIED BY 'securepass';
GRANT ALL ON ucode_web.* TO 'mnosov' @'localhost';

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(30) UNIQUE,
    hash VARCHAR(130),
    fullName VARCHAR(255),
    email VARCHAR(60) UNIQUE
)

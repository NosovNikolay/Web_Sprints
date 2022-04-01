CREATE DATABASE IF NOT EXISTS ucode_web;
CREATE USER IF NOT EXISTS 'mnosov'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL on ucode_web TO 'mnosov'@'localhost' 
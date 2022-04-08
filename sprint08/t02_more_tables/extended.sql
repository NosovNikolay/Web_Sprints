USE ucode_web;
DROP TABLE IF EXISTS heroes_powers;
DROP TABLE IF EXISTS heroes_teams;
DROP TABLE IF EXISTS powers;
DROP TABLE IF EXISTS races;
DROP TABLE IF EXISTS teams;
CREATE TABLE powers(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name TINYTEXT,
  type ENUM('attack', 'defense') NOT NULL
);
CREATE TABLE heroes_powers(
  hero_id INT UNSIGNED,
  power_id INT UNSIGNED,
  power_points INT,
  FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
  FOREIGN KEY (power_id) REFERENCES powers(id) ON DELETE CASCADE,
  PRIMARY KEY(hero_id, power_id)
);
CREATE TABLE races(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE
);
CREATE TABLE teams(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE
);
CREATE TABLE heroes_teams (
  hero_id INT UNSIGNED,
  team_id INT UNSIGNED,
  FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  PRIMARY KEY(hero_id, team_id)
);
ALTER TABLE
  heroes
ADD
  COLUMN race_id INT UNSIGNED,
ADD
  FOREIGN KEY (race_id) REFERENCES races(id) ON DELETE RESTRICT ON UPDATE CASCADE;
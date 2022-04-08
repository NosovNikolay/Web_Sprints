USE ucode_web;
INSERT INTO races (name)
VALUES ("Human"), ("Kree"), ("Asgardian");
INSERT INTO teams (name)
VALUES ("Avengers"), ("Hydra");
INSERT INTO powers (name, type)
VALUES ("bloody fist", "attack"), ("iron shield", "defense");
UPDATE heroes
SET race_id = 1;
UPDATE heroes
SET race_id = 1
WHERE name IN ("Thor", "Loki");
INSERT INTO
  heroes_powers (hero_id, power_id, power_points)
VALUES (1, 2, 200),
  (2, 2, 200);
INSERT INTO
  heroes_teams (hero_id, team_id)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (6, 1),
  (6, 2),
  (7, 1),
  (8, 1);
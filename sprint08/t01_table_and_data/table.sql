USE ucode_wed
DROP TABLE IF EXISTS heroes;
CREATE TABLE heroes(
    id INT(10) AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(255) NOT NULL,
    race VARCHAR(255) DEFAULT 'human' NOT NULL,
    class_role ENUM('tankman', 'healer', 'dps') NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_hero_name (name)
) 
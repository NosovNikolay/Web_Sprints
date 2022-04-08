USE ucode_wed;
DROP TABLE IF EXISTS heroes;
CREATE TABLE heroes(
    id INT(10) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    class_role ENUM('tankman', 'healer', 'dps') NOT NULL
);
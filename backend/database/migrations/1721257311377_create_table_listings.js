module.exports = {
    "up": `
        CREATE TABLE listings (
            id INT NOT NULL AUTO_INCREMENT,
            userId INT NOT NULL,
            address VARCHAR(255) NOT NULL,
            state CHAR(2) NOT NULL,
            country VARCHAR(100) NOT NULL,
            name VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            INDEX (userId),
            CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        )
    `,
    "down": "DROP TABLE IF EXISTS listings"
};

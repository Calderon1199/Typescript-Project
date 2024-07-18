module.exports = {
    "up": `
        CREATE TABLE reviewImages (
            id INT NOT NULL AUTO_INCREMENT,
            reviewId INT NOT NULL,
            url VARCHAR(275) NOT NULL,
            created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            CONSTRAINT fk_reviewId FOREIGN KEY (reviewId) REFERENCES reviews(id) ON DELETE CASCADE
        )
    `,
    "down": "DROP TABLE IF EXISTS reviewImages"
};

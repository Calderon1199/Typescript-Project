module.exports = {
    "up": `
        CREATE TABLE reviews (
            id INT NOT NULL AUTO_INCREMENT,
            listingId INT NOT NULL,
            userId INT NOT NULL,
            reviewText TEXT NOT NULL,
            stars INT NOT NULL,
            created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            INDEX (listingId),
            INDEX (userId),
            CONSTRAINT fk_listingId FOREIGN KEY (listingId) REFERENCES listings(id) ON DELETE CASCADE,
            CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        )
    `,
    "down": "DROP TABLE IF EXISTS reviews"
};

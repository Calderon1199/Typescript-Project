module.exports = {
    "up": `
        CREATE TABLE listingImages (
            id INT NOT NULL AUTO_INCREMENT,
            listingId INT NOT NULL,
            url VARCHAR(275) NOT NULL,
            preview BOOLEAN,
            created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            CONSTRAINT fk_listingId FOREIGN KEY (listingId) REFERENCES listings(id) ON DELETE CASCADE
        )
    `,
    "down": "DROP TABLE IF EXISTS listingImages"
};

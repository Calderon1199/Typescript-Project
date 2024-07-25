const { query } = require('../../migration');

class Listing {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.city = data.city;
        this.state = data.state;
        this.price = data.price;
        this.userId = data.userId;
        this.street = data.street;
        this.zipcode = data.zipcode;
        this.country = data.country;
        this.description = data.description;
    };

    async addListing() {
        const sql = 'INSERT INTO listings (name, city, state, price, userId, street, zipcode, country, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [this.name, this.city, this.state, this.price, this.userId, this.street, this.zipcode, this.country, this.description];
        const result = await query(sql, values);
        return result.insertId;
    };

    async updateListing(id) {
        const sql = 'UPDATE listings SET name = ?, city = ?, state = ?, price = ?, street = ?, zipcode = ?, country = ?, description = ? WHERE id = ?';
        const values = [this.name, this.city, this.state, this.price, this.street, this.zipcode, this.country, this.description, id];
        return await query(sql, values);
    };

    static async getUserListings(id) {
        const sql = 'SELECT * FROM listings WHERE userId = ?';
        return await query(sql, [id]);
    }

    static async getListingById(id) {
        const sql = 'SELECT id, name, city, state, price, userId, street, zipcode, country, description FROM listings WHERE id = ?';
        const listings = await query(sql, [id]);
        return listings[0];
    };

    static async deleteListingById(id) {
        const sql = 'DELETE FROM listings WHERE id = ?';
        return await query(sql, [id]);
    };

    static async getAllListings(limit = 10, offset = 0) {
        const sql = 'SELECT id, name, city, state, price, userId, street, zipcode, country, description FROM listings LIMIT ? OFFSET ?';
        return await query(sql, [limit, offset]);
    };
};

module.exports = Listing;

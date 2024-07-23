const { query } = require('../../migration');

class Listing {
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId;
        this.street = data.street;
        this.city = data.city;
        this.state = data.state;
        this.zipcode = data.zipcode;
        this.country = data.country;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
    }

    async addListing() {
        const sql = 'INSERT INTO listings (userId, street, city, zipcode, state, country, name, description, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [this.userId, this.street, this.city, this.zipcode, this.state, this.country, this.name, this.description, this.price];
        const result = await query(sql, values);
        return result.insertId;
    }

    async updateListing() {
        const sql = 'UPDATE listings SET street = ?, city = ?, zipcode = ?, state = ?, country = ?, name = ?, description = ?, price = ? WHERE id = ?';
        const values = [this.street, this.city, this.zipcode, this.state, this.country, this.name, this.description, this.price, this.id];
        await query(sql, values);
    }

    static async getListingById(id) {
        const sql = 'SELECT id, userId, street, city, zipcode, state, country, name, description, price FROM listings WHERE id = ?';
        const listings = await query(sql, [id]);
        return listings[0];
    }

    static async deleteListingById(id) {
        const sql = 'DELETE FROM listings WHERE id = ?';
        await query(sql, [id]);
    }

    static async getAllListings(limit = 10, offset = 0) {
        const sql = 'SELECT id, userId, street, city, zipcode, state, country, name, description, price FROM listings LIMIT ? OFFSET ?';
        return await query(sql, [limit, offset]);
    }
}

module.exports = Listing;

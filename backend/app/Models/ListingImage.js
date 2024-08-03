const { query } = require('../../migration');

class ListingImage {
    constructor(data) {
        this.id = data.id;
        this.url = data.url;
        this.userId = data.userId;
        this.preview = data.preview;
        this.listingId = data.listingId;
    };

    async addListingImage() {
        const sql = 'INSERT INTO listingImages (url, userId, preview, listingId) VALUES (?, ?, ?, ?)';
        const values = [this.url, this.userId, this.preview, this.listingId];
        const result = await query.apply(sql, values);
        return result.insertId;
    };

    async updateListingImage(id) {
        const sql = 'UPDATE listingImages SET url = ?, preview = ? WHERE id = ?';
        const values = [this.url, this.preview, id]
        await query(sql, values);
    };

    static async getListingImageById(id) {
        const sql = 'SELECT id, url, userId, preview, listingId FROM listingImages WHERE id = ?';
        const images = await query(sql, [id]);
        return images[0];
    };

    static async deleteListingImageById(id) {
        const sql = 'DELETE from listingImages WHERE id = ?';
        await query(sql, [id]);
    };

    static async getAllListingImages() {
        const sql = 'SELECT id, url, userId, preview, listingId FROM listingImages';
        return await query(sql);
    };
};

module.exports = ListingImage;

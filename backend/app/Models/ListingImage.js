const { query } = require('../../migration');

class ListingImage {
    constructor(data) {
        this.id = data.id
        this.reviewId = data.reviewId
        this.userId = data.userId
        this.url = data.url
        this.preview = data.preview
    }

    async addListingImage() {
        const sql = 'INSERT INTO listingImages (listingId, userId, preview, url) VALUES (?, ?, ?, ?)';
        const values = [this.listingId, this.userId, this.url, this.preview];
        const result = await query.apply(sql, values);
        return result.insertId;
    }

    async updateListingImage() {
        const sql = 'UPDATE listingImages SET url = ?, preview = ? WHERE id = ?';
        const values = [this.preview, this.url]
        await query(sql, values);
    }

    static async getListingImageById(id) {
        const sql = 'SELECT id, listingId, userId, url FROM listingImages WHERE id = ?';
        const images = await query(sql, [id]);
        return images[0];
    }

    static async deleteListingImageById(id) {
        const sql = 'DELETE from listingImages WHERE id = ?';
        await query(sql, [id]);
    }

    static async getAllListingImages() {
        const sql = 'SELECT id, userId, listingId, url FROM listingImages';
        return await query(sql)
    }
}

module.exports = ListingImage;

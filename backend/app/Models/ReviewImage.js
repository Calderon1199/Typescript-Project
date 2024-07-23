const { query } = require('../../migration');

class ReviewImage {
    constructor(data) {
        this.id = data.id
        this.reviewId = data.reviewId
        this.url = data.url
    }

    async addReviewImage() {
        const sql = 'INSERT INTO reviewImages (reviewId, url) VALUES (?, ?)';
        const values = [this.reviewId, this.url];
        const result = await query.apply(sql, values);
        return result.insertId;
    }

    async updateReviewImage() {
        const sql = 'UPDATE reviewImages SET reviewId = ?, url = ? WHERE id = ?';
        const values = [this.reviewId, this.url]
        await query(sql, values);
    }

    static async getReviewImageById(id) {
        const sql = 'SELECT id, reviewId, url FROM reviewImages WHERE id = ?';
        const images = await query(sql, [id]);
        return images[0];
    }

    static async deleteReviewImageById(id) {
        const sql = 'DELETE from reviewImages WHERE id = ?';
        await query(sql, [id]);
    }

    static async getAllReviewImages() {
        const sql = 'SELECT id, reviewId, url FROM reviewImages';
        return await query(sql)
    }
}

module.exports = ReviewImage;

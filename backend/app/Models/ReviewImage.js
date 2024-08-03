const { query } = require('../../migration');

class ReviewImage {
    constructor(data) {
        this.id = data.id;
        this.url = data.url;
        this.userId = data.userId;
        this.reviewId = data.reviewId;
    };

    async addReviewImage() {
        const sql = 'INSERT INTO reviewImages (url, userId, reviewId) VALUES (?, ?, ?)';
        const values = [this.url, this.userId, this.reviewId];
        const result = await query.apply(sql, values);
        return result.insertId;
    };

    async updateReviewImage(id) {
        const sql = 'UPDATE reviewImages SET url = ? WHERE id = ?';
        const values = [this.url, id];
        await query(sql, values);
    };

    static async getReviewImageById(id) {
        const sql = 'SELECT id, url, userId, reviewId FROM reviewImages WHERE id = ?';
        return await query(sql, [id]);
    };

    static async deleteReviewImageById(id) {
        const sql = 'DELETE from reviewImages WHERE id = ?';
        await query(sql, [id]);
    };

    static async getAllReviewImages() {
        const sql = 'SELECT id, url, userId, reviewId FROM reviewImages';
        return await query(sql);
    };
};

module.exports = ReviewImage;

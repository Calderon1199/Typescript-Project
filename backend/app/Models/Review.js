const { query } = require('../../migration');

class Review {
    constructor(data) {
        this.id = data.id;
        this.stars = data.stars;
        this.userId = data.userId;
        this.listingId = data.listingId;
        this.reviewText = data.reviewText;
    };

    async addReview() {
        const sql = 'INSERT INTO reviews (stars, userId, listingId, reviewText) VALUES (?, ?, ?, ?)';
        const values = [this.stars, this.userId, this.listingId, this.reviewText]
        const result = await query(sql, values);
        return result.insertId;
    };

    async updateReview(id) {
        const sql = 'UPDATE reviews SET stars = ?, reviewText = ? WHERE id = ?';
        const values = [this.stars, this.stars, id];
        await query(sql, values);
    };

    static async getUserReviews(id) {
        const sql = 'SELECT * FROM reviews WHERE userId = ?';
        return await query(sql, [id]);
    };

    static async getReviewById(id) {
        const sql = 'SELECT id, stars, userId, listingId, reviewText FROM reviews WHERE id = ?';
        const reviews = await query(sql, [id]);
        return reviews[0];
    };

    static async deleteReviewById(id) {
        const sql = 'DELETE FROM reviews WHERE id = ?';
        await query(sql, [id]);
    };

    static async getAllReviews(limit = 10, offset = 0) {
        const sql = 'SELECT id, stars, userId, listingId, reviewText FROM reviews LIMIT ? OFFSET ?';
        return await query(sql, [limit, offset]);
    };
};

module.exports = Review;

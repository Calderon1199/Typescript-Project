const { query } = require('../../migration');

class Review {
    constructor(data) {
        this.id = data.id
        this.userId = data.userId
        this.listingId = data.listingId
        this.reviewText = data.reviewText
        this.stars = data.stars
    }

    async addReview() {
        const sql = 'INSERT INTO reviews (userId, listingId, reviewText, stars) VALUES (?, ?, ?, ?)';
        const values = [this.userId, this.listingId, this.reviewText, this.stars]
        const result = await query(sql, values);
        return result.insertId;
    }

    async updateReview() {
        const sql = 'UPDATE reviews SET userId = ?, listingId = ?, reviewText = ?, stars = ? WHERE id = ?';
        const values = [this.userId, this.listingId, this.reviewText, this.stars];
        await query(sql, values);
    }

    static async getReviewById(id) {
        const sql = 'SELECT id, userId, listingId, reviewText, stars FROM reviews WHERE id = ?';
        const reviews = await query(sql, [id]);
        return reviews[0];
    }

    static async deleteReviewById(id) {
        const sql = 'DELETE FROM reviews WHERE id = ?';
        await query(sql, [id]);
    }

    static async getAllReviews(limit = 10, offset = 0) {
        const sql = 'SELECT id, userId, listingId, reviewText, stars FROM reviews LIMIT ? OFFSET ?';
        return await query(sql, [limit, offset]);
    }
}

module.exports = Review;

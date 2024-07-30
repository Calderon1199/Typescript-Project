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

    static async getReviewsByListingId(listingId, limit, offset) {
        const sql = 'SELECT * FROM reviews WHERE listingId = ? LIMIT ? OFFSET ?';
        const reviews = await query(sql, [listingId, limit, offset]);
        return reviews;
    };

    static async getImagesByListingId(listingId) {
        const sql = 'SELECT * from listingImages WHERE listingId = ?';
        const images = await query(sql, [listingId]);
        return images;
    }

    static async getListingById(id) {
        const sql = `
            SELECT
            l.id as listingId, l.name, l.city, l.state, l.price, l.userId, l.street, l.zipcode, l.country, l.description, l.created_at as listingCreatedAt,
            u.id as ownerId, u.fullName as ownerName,
            r.id as reviewId, r.reviewText, r.stars, r.created_at as reviewCreatedAt,
            ri.id as reviewImageId, ri.url as reviewImageUrl, ri.created_at as reviewImageCreatedAt
            FROM listings l
            LEFT JOIN users u ON l.userId = u.id
            LEFT JOIN reviews r ON l.id = r.listingId
            LEFT JOIN reviewImages ri ON r.id = ri.reviewId
            WHERE l.id = ?
            ORDER BY r.created_at DESC
            LIMIT 6
        `;
        const listingData = await query(sql, [id]);

        if (listingData.length === 0) {
            return [];
        }

        const listing = {
            id: listingData[0].listingId,
            name: listingData[0].name,
            city: listingData[0].city,
            state: listingData[0].state,
            price: listingData[0].price,
            userId: listingData[0].userId,
            street: listingData[0].street,
            zipcode: listingData[0].zipcode,
            country: listingData[0].country,
            description: listingData[0].description,
            createdAt: listingData[0].listingCreatedAt,
            owner: {
                id: listingData[0].ownerId,
                name: listingData[0].ownerName.split(' ').slice(0, 1).join('')
            },
            reviews: listingData.filter(row => row.reviewId).map(row => ({
                id: row.reviewId,
                reviewText: row.reviewText,
                stars: row.stars,
                createdAt: row.reviewCreatedAt,
            }))
        };

        return listing;
    }


    static async deleteListingById(id) {
        const sql = 'DELETE FROM listings WHERE id = ?';
        return await query(sql, [id]);
    };

    static async getAllListings(limit = 10, offset = 0) {
        const sql = `
        SELECT
            l.id as listingId,
            l.name,
            l.city,
            l.state,
            l.price,
            l.userId,
            l.street,
            l.zipcode,
            l.country,
            l.description,
            li.id as listingImageId,
            li.url as listingImageUrl,
            li.preview,
            li.created_at as listingImageCreatedAt
        FROM listings l
        LEFT JOIN listingImages li ON l.id = li.listingId
        LIMIT ? OFFSET ?
    `;
        const queryParams = [limit, offset];
        const listingData = await query(sql, queryParams);

        if (listingData.length === 0) {
            return null;
        }

        const listings = listingData.reduce((acc, row) => {
            let listing = acc.find(l => l.listingId === row.listingId);

            if (!listing) {
                listing = {
                    id: row.listingId,
                    name: row.name,
                    city: row.city,
                    state: row.state,
                    price: row.price,
                    userId: row.userId,
                    street: row.street,
                    zipcode: row.zipcode,
                    country: row.country,
                    description: row.description,
                    listingImages: []
                };
                acc.push(listing);
            }

            if (row.listingImageId) {
                listing.listingImages.push({
                    id: row.listingImageId,
                    url: row.listingImageUrl,
                    preview: row.preview,
                    createdAt: row.listingImageCreatedAt,
                });
            }

            return acc;
        }, []);

        return listings;
    }
};

module.exports = Listing;

const { query } = require('../../migration');  // Adjust the path as necessary

class User {
    constructor(data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password; // This will be hashed before storage
    }


    async addUser() {
        const sql = 'INSERT INTO users (firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?)';
        const values = [this.firstName, this.lastName, this.username, this.password, this.email];
        const result = await query(sql, values);
        return result.insertId;
    }

    async updateUser(id) {
        const sql = 'UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ? WHERE id = ?';
        const values = [this.firstName, this.lastName, this.username, this.email, id];
        await query(sql, values);
    }

    static async getUserById(id) {
        const sql = 'SELECT id, firstName, lastName, username, email FROM users WHERE id = ?';
        const users = await query(sql, [id]);
        return users[0];
    }

    static async deleteUserById(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        await query(sql, [id]);
    }

    static async getAllUsers(limit = 10, offset = 0) {
        const sql = 'SELECT id, firstName, lastName, username, email FROM users LIMIT ? OFFSET ?';
        return await query(sql, [limit, offset]);
    }

    static async getUserByUsername(username) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        const users = await query(sql, [username]);
        return users[0];
    }
}

module.exports = User;

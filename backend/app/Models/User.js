const { query } = require('../../migration');
const bcrypt = require('bcrypt');

class User {
    constructor(data) {
        this.fullName = data.fullName
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
    };


    async addUser() {
        const hashedPassword = await bcrypt.hashSync(this.password, 10);
        const sql = 'INSERT INTO users (fullName, username, password, email) VALUES (?, ?, ?, ?)';
        const values = [this.fullName, this.username, hashedPassword, this.email];
        const result = await query(sql, values);
        return result.insertId;
    }

    async updateUser(id) {
        const sql = 'UPDATE users SET username = ? WHERE id = ?';
        const values = [this.username, id];
        await query(sql, values);
    };

    static async getUserById(id) {
        const sql = 'SELECT id, fullName, username, email FROM users WHERE id = ?';
        const users = await query(sql, [id]);
        return users[0];
    };

    static async deleteUserById(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        await query(sql, [id]);
    };

    static async getAllUsers(limit = 10, offset = 0) {
        const sql = 'SELECT id, fullName, username, email FROM users LIMIT ? OFFSET ?';
        return await query(sql, [limit, offset]);
    };

    static async getUserByUsername(username) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        const users = await query(sql, [username]);
        return users[0];
    };

    static async authenticate(usernameOrEmail, password) {
        const sql = 'SELECT id, fullName, username, password, email FROM users WHERE username = ? OR email = ?';
        const users = await query(sql, [usernameOrEmail, usernameOrEmail]);

        if (users.length === 0) return null;

        const user = users[0];
        const passwordMatch = await bcrypt.compareSync(password, user.password);

        if (passwordMatch) {
            return user;
        } else {
            return null;
        }
    };
};

module.exports = User;

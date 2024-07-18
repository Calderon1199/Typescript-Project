class User {

    constructor(data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
    }

    addUser() {
        return `INSERT INTO users(firstName, lastName, username, password, email) \
                   VALUES('${this.firstName}','${this.lastName}', '${this.username}', '${this.password}', '${this.email}')`;
    }

    updateUser(id) {
        return `UPDATE users SET firstName = '${this.firstName}', lastName = '${this.lastName}', username = '${this.username}', password = '${this.password}', email = '${this.email}' WHERE id = ${id}`;
    }

    static getUserById(id) {
        console.log(id);
        return `SELECT * FROM users WHERE id = ${id}`;
    }

    static deleteUserById(id) {
        return `DELETE FROM users WHERE id = ${id}`;
    }

    static getAllUsers() {
        return `SELECT * FROM users`;
    }
}

module.exports = User;

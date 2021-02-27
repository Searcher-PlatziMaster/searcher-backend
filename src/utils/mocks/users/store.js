const userMock = {
    _id: '6036dc09cbe5ba18ca35d216',
    isAdmin: false,
    name: 'name',
    email: 'name@undefined.com',
    password: '$2b$10$WJILkwkicY8KGZtAcqGbNOUKBkC8dw2rIUUPbq3J4vsr05eX9tR/W',
    createdAt: '2021-02-24T23:06:49.057+00:00',
    updatedAt: '2021-02-24T23:26:48.059+00:00',
}

class UsersStore {

    async getUser(query) {
        if (query) {
            return userMock
        }
    }

    async createUser(user) {
        if (user) {
            return userMock
        }
    }

    async updateUser(id, data) {
        if (id && data) {
            return userMock
        }
    }

    async deleteuser(id) {
        if (id) {
            return null
        }
    }
}

module.exports = UsersStore
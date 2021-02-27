class UsersController {
    async updateUser(id, user) {
        if (id && user) {
            return {
                _id: '6036dc09cbe5ba18ca35d216',
                name: 'name',
                email: 'name@undefined.com',
            }
        }
    }

    async deleteUser(id) {
        if (id) {
            return null
        }
    }
}

module.exports = UsersController
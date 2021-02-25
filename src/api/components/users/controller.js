const UsersStore = require('./store')
const bcrypt = require('bcrypt')
const { config } = require('../../../config')

class UsersController {
    constructor() {
        this.store = new UsersStore()
    }
    async updateUser(id, user) {
        const { password } = user
        let userUpdated;

        if (password) {
            const passwordEncrypted = await bcrypt.hash(user.password, config.saltRoundsBcrypt);
            delete user.password;

            const newUserData = {
                ...user,
                password: passwordEncrypted
            }
            userUpdated = await this.store.updateUser(id, newUserData)
        } else {
            userUpdated = await this.store.updateUser(id, user)
        }

        return {
            _id: userUpdated._id,
            name: userUpdated.name,
            email: userUpdated.email,
        }

    }

    async deleteUser(id) {
        const userDeleted = await this.store.deleteuser(id)
        return userDeleted
    }
}

module.exports = UsersController
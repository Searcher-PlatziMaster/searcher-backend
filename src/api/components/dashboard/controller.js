const UsersStore = require('../users/store');

class DashboardController {
    constructor(){
        this.store = new UsersStore()
    }

    async getAllUsers() {
        let allUsers = await this.store.getUser({})
        return allUsers
    }   
}

module.exports = DashboardController
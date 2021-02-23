const userModel = require("../../../db/models/users")

class UsersStore {
    constructor(){
        this.model = userModel
    }
    
    async getUser(query){
        const user =  await this.model.findOne(query)
        return user
    }

    async createUser(user){
        const userCreated =  await this.model.create(user)
        return userCreated
    }

    async updateUser(id, data){
        const userUpdated =  await this.model.findOneAndUpdate(
            {_id: id}, //This query find user by id 
            data
        )
        return userUpdated    
    }
    
    async deleteuser(id){
        await this.model.deleteOne({_id: id})
        const userDeleted = await this.getUser({_id: id})

        return userDeleted
    }
}

module.exports = UsersStore
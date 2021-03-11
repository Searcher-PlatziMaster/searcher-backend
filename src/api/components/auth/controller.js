const UsersStore = require('../users/store');
const { config } = require('../../../config');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const boom = require('@hapi/boom');
const { createToken } = require('../../../utils/createJwt')

class AuthController {
    constructor(){
        this.store = new UsersStore()
    }

    async signin(basicAuth) {
        const encodedUserAndEmail = basicAuth.split(' ')[1]
        const userAndEmailString = base64.decode(encodedUserAndEmail)
        const [email, password] = userAndEmailString.split(':')
        
        
        let user = await this.store.getUser({email})
        let comparePasswords = await bcrypt.compare(password, user.password)

        delete user._doc.password // If we returned this information
        delete user._doc.isAdmin // it be dangerous
        if (comparePasswords) {
            return {
                user,
                token: createToken(user)
            }
        }

        return boom.unauthorized('Wrong Email or Password')
    }   
    async signup(user) {
        let passwordEncrypted = await bcrypt.hash(user.password, config.saltRoundsBcrypt);
        delete user.password;
        let userCreated = await this.store.createUser({
            ...user,
            password: passwordEncrypted
        })
        
        delete userCreated._doc.password; // If we returned this information
        delete userCreated._doc.isAdmin; // it be dangerous
        return userCreated
    }   
}

module.exports = AuthController
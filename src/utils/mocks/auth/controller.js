const { createToken } = require('../../createJwt');
const base64 = require('base-64');
const boom = require('@hapi/boom'); 

const userMock = {
    _id: '6036dc09cbe5ba18ca35d216',
    isAdmin: false,
    name: 'name',
    email: 'name@undefined.com',
    password: 'Password3',
    createdAt: '2021-02-24T23:06:49.057+00:00',
    updatedAt: '2021-02-24T23:26:48.059+00:00',
}

class AuthController {

    async signin(basicAuth) {
        const encodedUserAndEmail = basicAuth.split(' ')[1]
        const userAndEmailString = base64.decode(encodedUserAndEmail)

        const [email, password] = userAndEmailString.split(':')
        
        let comparePasswords = password === userMock.password && email === userMock.email  
        
        delete userMock.password // If we returned this information
        delete userMock.isAdmin // it be dangerous
        
        if (comparePasswords) {
            return {
                user: userMock,
                token: createToken(userMock)
            }
        }

        return boom.unauthorized('Wrong Email or Password')
    }   
    async signup(user) { 
        if (user) {
            userMock.password; 
            userMock.isAdmin; 
            return userMock
        }
    }   
}

module.exports = AuthController
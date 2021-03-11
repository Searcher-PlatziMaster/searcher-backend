const { config } = require('../../../config/index');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
function onlyToken(header){
    let [,token] = header.split(" ")

    return token
}

module.exports =function verifyJwt() {
    return function middleware (req, res, next) {
        try {
                       
            let token = req.cookies.token ? 
                req.cookies.token :
                onlyToken(req.headers.authorization);

            if(token) {
                const decoded = jwt.verify(token, config.jwt_secret);
                req.userData = decoded;
            } else {
                throw boom.proxyAuthRequired('Bearer token is required 🐻');
            }
            next();
        } catch (error) {
            if(error.message === "jwt expired") throw boom.unauthorized('Your JWT has been expired 🕐');
            throw boom.badRequest(error.message);
        }
    }
}

const boom = require('@hapi/boom');

module.exports = function validateIdAndSub() {
    return function middleware(req, res, next) {
        try {
            console.log('__req.userData___');
            if (req.userData.sub !== req.params.id) {
                throw boom.unauthorized('Invalid user id 🐻');
            }
            next();
        } catch (error) {
            throw boom.badRequest(error.message);
        }
    }
}


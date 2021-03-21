const boom = require('@hapi/boom')
const UsersConstroller = require('../../../api/components/users/controller')

const usersConstroller = new UsersConstroller()

module.exports = function verifyIsAdmin() {
    return function middleware(req, res, next) {
        try {

            const { userData } = req
            usersConstroller.getUser(userData.sub)
                .then(user => {
                    if (user.isAdmin === true) {
                        return next()
                    } else {
                        res.redirect("/api/dashboard/login")
                    }

                })
        } catch (error) {
            throw boom.unauthorized('Unauthorized 🕐');
        }

    }
}
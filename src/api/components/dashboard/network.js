const express = require('express');
const checkJwt = require('../../../utils/middlewares/auth/checkJwt');
const isAdmin = require('../../../utils/middlewares/auth/isAdmin');
const router = express.Router();
const DashboardController = require('./controller');

const dashboardController = new DashboardController()

router.get('/login', async (req, res, next) => {
    try {
        res.render('login')

    } catch (error) {
        next()
    }
})

router.get('/', checkJwt({ dashboard: true }), isAdmin(), async (req, res,) => {
    try {
        res.render('dashboard')

    } catch (error) {
        res.redirect('/api/dashboard/login')
    }
})

// Get All Users
router.get('/data', checkJwt(), isAdmin(), async (req, res, next) => {
    try {
        const users = await dashboardController.getAllUsers()
        console.log(users[0].name);
        res.json({
            message: 'Print this data in dashboard',
            users
        })

    } catch (error) {
        next()
    }
})

module.exports = router;
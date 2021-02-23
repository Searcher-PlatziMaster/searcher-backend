const express = require('express');
const AuthController = require('./controller');
const { config } = require('../../../config');
const router = express.Router();
const { createUserSchema } = require('../../../utils/validations/schemas/userExample'); // eslint-disable-line

const validationHandler = require('../../../utils/middlewares/validationHandler');

const authController = new AuthController()
router.post('/sign-in', async (req, res, next) => {  
    try {
        const { authorization } = req.headers
        const { user, token } = await authController.signin(authorization)
        
        res.cookie("token", token, {
            httpOnly: !config.dev,
            secure: !config.dev,
        });

        res.status(200).json(user);
    
    } catch (error) {
        next(error)
    }
})

router.post('/sign-up', validationHandler(createUserSchema), async (req, res, next) => {
    try {
        const userCreated = await authController.signup(req.body)
        res.status(201).json(userCreated)
    } catch (error) {
        next(error)      
    }

})

module.exports = router;
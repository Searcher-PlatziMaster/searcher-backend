const express = require('express');
const router = express.Router();
const { createUserSchema, userIdSchema, updateUserSchema } = require('../../../utils/validations/schemas/userExample'); // eslint-disable-line
const verifyJwt = require('../../../utils/middlewares/auth/checkJwt');
const validateIdAndSub = require('../../../utils/middlewares/validateIdAndSub');
const validationHandler = require('../../../utils/middlewares/validationHandler'); // eslint-disable-line
const UsersController = require('./controller');

const usersController = new UsersController()

// Update User 
router.put('/:id',
    verifyJwt(),
    validateIdAndSub(),
    validationHandler(updateUserSchema),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const { body: user } = req

            const data = await usersController.updateUser(id, user)
            res.status(200).json({
                message: 'User updated',
                data
            });
        } catch (error) {
            next(error)
        }
    })

// Delete User
router.delete('/:id',
    verifyJwt(),
    validateIdAndSub(),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const data = await usersController.deleteUser(id)
            res.status(200).json({
                message: 'User deleted',
                data
            })
        } catch (error) {
            next(error);
        }
    })

module.exports = router;
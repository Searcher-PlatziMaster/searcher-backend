const express = require('express');
const UsersHistoryController = require('./controller');

const verifyJwt = require('../../../utils/middlewares/auth/checkJwt')
const validateIdAndSub = require('../../../utils/middlewares/validateIdAndSub');

const router = express.Router();
const usersHistoryController = new UsersHistoryController()

router.get('/:id',
    verifyJwt(),
    validateIdAndSub(),
    async (req, res, next) => {
        try {
            const { id: userId } = req.params
            const userHistory = await usersHistoryController.getUserHistory(userId)
            res.status(200).json({
                message: 'User history',
                data: userHistory
            })
        } catch (error) {
            next(error);
        }
    })

router.post('/:id',
    verifyJwt(),
    validateIdAndSub(),
    async (req, res, next) => {
        try {
            const { id: userId } = req.params
            const { body: historyItem } = req

            const userHistory = await usersHistoryController.createUserHistory(userId, historyItem)
            
            res.status(200).json({
                message: 'Craeted Item in User history',
                data: userHistory
            })
        } catch (error) {
            next(error);
        }
    })

router.delete('/:id/:historyItemId',
    verifyJwt(),
    validateIdAndSub(),
    async (req, res, next) => {
        try {
            const { historyItemId } = req.params
            await usersHistoryController.deleteUserHistory(historyItemId)
            res.status(200).json({
                message: 'History Item Deleted',
            })
        } catch (error) {
            next(error);
        }
    })

module.exports = router;
const express = require('express');
const router = express.Router();
const esController = require('./controller');


router.get('/health', async (req, res, next) => {  
    try {
        const health = await esController.chechHealth();
        res.status(200).json(health);
    } catch (error) {
        next(error)
    }
})


module.exports = router;
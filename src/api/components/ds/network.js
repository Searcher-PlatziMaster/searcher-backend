const express = require('express');
const router = express.Router();
const dsController = require('./controller');


router.get('/searches', async (req, res, next) => {  
    try {
        const searches = await dsController.getSearches();
        res.status(200).send(searches);
    } catch (error) {
        next(error)
    }
})

router.get('/users', async (req, res, next) => {  
    try {
        const searches = await dsController.getUsers();
        res.status(200).send(searches);
    } catch (error) {
        next(error)
    }
})




module.exports = router;
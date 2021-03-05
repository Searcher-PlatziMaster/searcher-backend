const express = require('express');
const router = express.Router();
const esController = require('./controller');
const validationHandler = require('../../../utils/middlewares/validationHandler');
const { createDocumentSchema } = require('../../../utils/validations/schemas/docs');


router.get('/health', async (req, res, next) => {  
    try {
        const health = await esController.chechHealth();
        res.status(200).json(health);
    } catch (error) {
        next(error)
    }
})

router.post('/index', async(req, res, next) => {
    const { index } = req.body;
    try {
        const created = await esController.createIndex(index);
        res.status(200).json(created);
    } catch (error) {
        next(error);
    }

})

router.post('/constitucion', validationHandler(createDocumentSchema), async (req, res, next) => {
    const { index, headline, subhead, article } = req.body;
    try {
        const inserted = await esController.insertDocument(index, headline, subhead, article);
        res.status(200).json(inserted);
    } catch (error) {
        next(error);
    }
})

router.post('/refresh', async (req, res, next) => {
    const { index } = req.body
    try {
        const refreshed = await esController.refreshIndex(index);
        res.status(200).json(refreshed);
    } catch (error) {
        next(error);
    }
})

router.get('/search', async (req, res, next) => {
    const { search, index } = req.query;
    try {
        const finded = await esController.searchBasic(index, search);
        res.status(200).json(finded);
    } catch (error) {
        next(error);
    }
})

router.get('/mapping/:index', async (req, res, next) => {
    const { index } = req.params;
    console.log(index)
    try {
        const finded = await esController.getMappings(index);
        res.status(200).json(finded);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
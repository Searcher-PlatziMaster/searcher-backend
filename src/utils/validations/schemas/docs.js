const joi = require('joi');

const indexSchema = joi.string().lowercase().max(50);
const headlineSchema = joi.object().keys({
    title: joi.string().max(120),
    name: joi.string().max(150)
})
const chapterSchema = joi.object().keys({
    title: joi.alternatives().try(joi.string(), joi.exist()),
    name: joi.alternatives().try(joi.string(), joi.exist())
})
const articleSchema = joi.object().keys({
    name: joi.string().max(200),
    content: joi.array().items(joi.string())
})

const createDocumentSchema = {
    index: indexSchema.required(),
    headline: headlineSchema.required(),
    chapter: chapterSchema.required(),
    article: articleSchema.required()
}

module.exports = {
    createDocumentSchema
}
const joi = require('joi');

const indexSchema = joi.string().lowercase().max(50);
const headlineSchema = joi.object().keys({
    title: joi.alternatives().try(joi.string(), joi.exist()),
    name: joi.alternatives().try(joi.string(), joi.exist()),
})
const chapterSchema = joi.object().keys({
    title: joi.alternatives().try(joi.string(), joi.exist()),
    name: joi.alternatives().try(joi.string(), joi.exist())
})
const articleSchema = joi.object().keys({
    name: joi.string().max(200),
    content: joi.array().items(joi.string())
})
const idSchema = joi.string();

const legal_sourceSchema = joi.alternatives().try(joi.string(), joi.exist());
const bookSchema = joi.object().keys({
    title: joi.alternatives().try(joi.string(), joi.exist()),
    name: joi.alternatives().try(joi.string(), joi.exist()),
})

const sectionSchema = joi.object().keys({
    title: joi.alternatives().try(joi.string(), joi.exist()),
    name: joi.alternatives().try(joi.string(), joi.exist()),
})

const partSchema = joi.object().keys({
    title: joi.alternatives().try(joi.string(), joi.exist()),
    name: joi.alternatives().try(joi.string(), joi.exist()),
})


const createDocumentSchema = {
    index: indexSchema.required(),
    id: idSchema.required(),
    headline: headlineSchema.required(),
    chapter: chapterSchema.required(),
    article: articleSchema.required(),
    legal_source: legal_sourceSchema.required(),
    book: bookSchema.required(),
    section: sectionSchema.required(),
    part: partSchema.required(),
}

module.exports = {
    createDocumentSchema
}
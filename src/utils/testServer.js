const express = require('express');
const cookieParser = require('cookie-parser');
const supertest = require('supertest');

function testServer(path, router) {
    const app = express();
    //These middlewares required for testing
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    app.use(`${path}`,router)

    return supertest(app)
}

module.exports = testServer
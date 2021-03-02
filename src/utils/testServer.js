const express = require('express');
const cookieParser = require('cookie-parser');
const supertest = require('supertest');

const app = express();
function testServer(path, router) {
    //These middlewares required for testing
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    app.use(path,router)

    return supertest(app)
}

module.exports = {testServer}
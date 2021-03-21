const express = require('express');
const app = express();
require('./db');
const cors = require('cors');
// const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const router = require('./api/routes/routes');
const {
    logErrors,
    errorHandler,
    wrapErrors
} = require('./utils/middlewares/errorHandlers');
const notFoundHandler = require('./utils/middlewares/notFound');

//  Server configs
const { config } = require('./config/index');
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// Templete engine and static files
app.use('/static', express.static(`${__dirname}/public`))
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// Middlewares
app.use(cors())

// app.use(helmet());

// app.use(helmet.contentSecurityPolicy({
//     directives:{
//       defaultSrc:["'self'"],
//       scriptSrc:["'self'",'cdn.jsdelivr.net', 'cdn.plot.ly'],
//       styleSrc:["'self'",'cdn.jsdelivr.net'],
//     }}));

if (config.dev) {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Routes
router(app);

// Error 404
app.use(notFoundHandler);

// Errors middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listening on: http://localhost:${config.port}`);
})

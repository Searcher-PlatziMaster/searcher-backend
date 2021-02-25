require('dotenv').config();

const config = {
	dev: process.env.NODE_ENV !== 'production',
	port: process.env.PORT || 3000,
	DB_CONNECTION: process.env.DB_CONNECTION,
	jwt_secret: process.env.JWT_SECRET  || 'secret',
	es_user: process.env.ELASTIC_USER,
	es_pass: process.env.ELASTIC_PASS,
	saltRoundsBcrypt: parseInt(process.env.SALT_ROUNDS_BCRYPT) 
};

module.exports = { config };

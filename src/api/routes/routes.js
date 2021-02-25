const userRoutes = require('../components/users/network');
const authRoutes = require('../components/auth/network');
const esRoutes = require('../components/elasticSearch/network');

const routes = (app) => {
    app.use('/api/user', userRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/es', esRoutes);
}

module.exports = routes;
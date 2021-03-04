const userRoutes = require('../components/users/network');
const authRoutes = require('../components/auth/network');
const esRoutes = require('../components/elasticSearch/network');
const usersHistoryRoutes = require('../components/usersHistory/network');

const routes = (app) => {
    app.use('/api/user', userRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/es', esRoutes);
    app.use('/api/users-history', usersHistoryRoutes);
}

module.exports = routes;
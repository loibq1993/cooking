const HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');

function route(app) {
    app.use('/signin', UserController.signIn)
    app.use('/login', UserController.login)
    app.use('/', HomeController.index);
}

module.exports = route;
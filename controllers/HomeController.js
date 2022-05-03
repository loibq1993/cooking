class HomeController {
    async index(req, res) {
        res.render('index', {title: "Home"});
    }
}

module.exports = new HomeController;
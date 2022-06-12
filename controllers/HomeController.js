class HomeController {
    async index(req, res) {
        res.render('index', {title: "Home"});
    }

    async nav(req, res) {
        res.render('header', {
            // categories:
        })
    }
}

module.exports = new HomeController;
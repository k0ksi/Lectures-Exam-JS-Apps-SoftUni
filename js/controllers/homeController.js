var app = app || {};

app.homeController = (function () {
    function HomeController(viewBag, model) {
        this._model = model;
        this._viewBag = viewBag;
    }

    HomeController.prototype.loadWelcomePage = function (selector) {
        this._viewBag.showWelcomePage(selector);
    };

    HomeController.prototype.loadHomePage = function (selector) {
        var username = sessionStorage['username'];
        var data = {
            username: username
        };

        this._viewBag.showHomePage(selector, data);
    };

    return {
        load: function (viewBag, model) {
            return new HomeController(viewBag, model);
        }
    }
})();
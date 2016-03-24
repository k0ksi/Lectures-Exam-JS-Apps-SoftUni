var app = app || {};

app.userController = (function () {
    function UserController(viewBag, model) {
        this._model = model;
        this._viewBag = viewBag;
    }

    UserController.prototype.loadLoginPage = function (selector) {
        this._viewBag.showLoginPage(selector);
    };

    UserController.prototype.login = function (data) {
        return this._model.login(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                noty({
                    theme: 'relax',
                    text: 'You have successfully logged in!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/home/'})
                });
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || 'A problem occurred while signing in!',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }).done();
    };

    UserController.prototype.loadRegisterPage = function (selector) {
        this._viewBag.showRegisterPage(selector);
    };

    UserController.prototype.register = function (data) {
        return this._model.register(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                noty({
                    theme: 'relax',
                    text: 'You have successfully registered!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/home/'})
                });
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || 'A problem occurred with your registration!',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }).done();
    };

    UserController.prototype.logout = function () {
        this._model.logout()
            .then(function (success) {
                sessionStorage.clear();

                noty({
                    theme: 'relax',
                    text: 'You have successfully logged out!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/'});
                });
            }).done();
    };

    return {
        load: function (viewBag, model) {
            return new UserController(viewBag, model);
        }
    }
})();
var app = app || {};

(function () {
    var router = Sammy(function () {
        var selector = '#container';
        var menuSelector = '#menu';
		// var requester = app.requester.load('', '', '');
        var requester = app.requester.load('kid_-1zmcdVp1b', '4d08ca7f6ab9426790e690dd3b810892', 'https://baas.kinvey.com/');

        var homeViewBag = app.homeViewBag.load();
        var userViewBag = app.userViewBag.load();
        var lecturesViewBag = app.lecturesViewBag.load();

        var userModel = app.userModel.load(requester);
        var lecturesModel = app.lecturesModel.load(requester);

        var userController = app.userController.load(userViewBag, userModel);
        var lecturesController = app.lecturesController.load(lecturesViewBag, lecturesModel);
        var homeController = app.homeController.load(homeViewBag);

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function () {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function () {
            if(!sessionStorage['sessionId']) {
                $.get('templates/menu-login.html', function (templ) {
                    $(menuSelector).html(templ);
                });
            } else {
                $.get('templates/menu-home.html', function (templ) {
                    $(menuSelector).html(templ);
                });
            }
        });

        this.get('#/', function () {
            if(!sessionStorage['sessionId']) {
                homeController.loadWelcomePage(selector);
            } else {
                homeController.loadHomePage(selector);
            }
        });

        this.get('#/home/', function () {
            homeController.loadHomePage(selector);
        });

        this.get('#/login/', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function () {
            userController.loadRegisterPage(selector);
        });

        this.get('#/logout/', function () {
            userController.logout();
        });

        this.get('#/calendar/list/', function () {
            lecturesController.loadLectures(selector);
        });

        this.get('#/calendar/my/', function () {
            lecturesController.loadMyLectures(selector);
        });

        this.get('#/calendar/add/', function () {
            lecturesController.loadAddLecture(selector);
        });

        this.bind('redirectUrl', function (ev, data) {
            this.redirect(data.url);
        });

        this.bind('login', function (ev, data) {
            userController.login(data);
        });

        this.bind('register', function (ev, data) {
            userController.register(data);
        });

        this.bind('addLecture', function (ev, data) {
            lecturesController.addLecture(data);
        });

        this.bind('showEditLecture', function (ev, data) {
            lecturesController.loadEditLecture(selector, data);
        });

        this.bind('showDeleteLecture', function (ev, data) {
            lecturesController.loadDeleteLecture(selector, data);
        });

        this.bind('editLecture', function (ev, data) {
            lecturesController.editLecture(data);
        });

        this.bind('deleteLecture', function (ev, data) {
            lecturesController.deleteLecture(data.id);
        });
    });

    router.run('#/');
})();
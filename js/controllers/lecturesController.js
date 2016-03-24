var app = app || {};

app.lecturesController = (function () {
    function LecturesController(viewBag, model) {
        this._model = model;
        this._viewBag = viewBag;
    }

    LecturesController.prototype.loadLectures = function (selector) {
        var _this = this;
        this._model.getAllLectures()
            .then(function (data) {
                var result = {
                    lectures: []
                };

                data.forEach(function (lecture) {
                    result.lectures.push({
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer
                    });
                });

                _this._viewBag.showLectures(selector, result);
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || 'A problem occurred while loading the lectures!',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }).done();
    };

    LecturesController.prototype.loadMyLectures = function (selector) {
        var _this = this;
        var userId = sessionStorage['userId'];
        this._model.getLecturesByUserId(userId)
            .then(function (data) {
                var result = {
                    lectures: []
                };
                data.forEach(function (lecture) {
                    result.lectures.push({
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer,
                        id: lecture._id
                    })
                });
                _this._viewBag.showMyLectures(selector, result);
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || 'A problem occurred while loading your lectures!',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }).done();
    };

    LecturesController.prototype.loadAddLecture = function (selector) {
        this._viewBag.showAddLecture(selector);
    };

    LecturesController.prototype.addLecture = function (data) {
        var result = {
            title: data.title,
            start: data.start,
            end: data.end,
            lecturer: data.lecturer
        };

        this._model.addLecture(result)
            .then(function (success) {
                noty({
                    theme: 'relax',
                    text: 'You have successfully added a lecture!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'})
                });
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || 'A problem occurred while adding your lecture!',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            }).done();
    };

    LecturesController.prototype.loadEditLecture = function (selector, data) {
        this._viewBag.showEditLecture(selector, data);
    };

    LecturesController.prototype.editLecture = function (data) {
        data.lecturer = sessionStorage['username'];
        this._model.editLecture(data.id, data)
            .then(function (success) {
                noty({
                    theme: 'relax',
                    text: 'You have successfully edited a lecture!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'})
                });
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || 'A problem occurred while editing your lecture!',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'})
                });
            }).done();
    };

    LecturesController.prototype.loadDeleteLecture = function (selector, data) {
        this._viewBag.showDeleteLecture(selector, data);
    };

    LecturesController.prototype.deleteLecture = function (lectureId) {
        this._model.deleteLecture(lectureId)
            .then(function (success) {
                noty({
                    theme: 'relax',
                    text: 'You have successfully deleted a lecture!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'})
                });
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || 'A problem occurred while deleting your lecture!',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'})
                });
            }).done();
    };

    return {
        load: function (viewBag, model) {
            return new LecturesController(viewBag, model);
        }
    }
})();
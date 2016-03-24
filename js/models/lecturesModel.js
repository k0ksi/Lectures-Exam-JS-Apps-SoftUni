var app = app || {};

app.lecturesModel = (function () {
    function LecturesModel(requester) {
        this._requester = requester;
        this._serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/lectures/';
    }

    LecturesModel.prototype.getAllLectures = function () {
        return this._requester.get(this._serviceUrl, true);
    };

    LecturesModel.prototype.getLecturesByUserId = function (userId) {
        var requestUrl = this._serviceUrl + '?query={"_acl.creator":"' + userId + '"}';

        return this._requester.get(requestUrl, true);
    };

    LecturesModel.prototype.addLecture = function (data) {
        return this._requester.post(this._serviceUrl, data, true);
    };

    LecturesModel.prototype.editLecture = function (lectureId, data) {
        var requestUrl = this._serviceUrl + lectureId;

        return this._requester.put(requestUrl, data, true);
    };

    LecturesModel.prototype.deleteLecture = function (lectureId) {
        var requestUrl = this._serviceUrl + lectureId;

        return this._requester.delete(requestUrl, true);
    };

    return {
        load: function (requester) {
            return new LecturesModel(requester);
        }
    }
})();
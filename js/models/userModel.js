var app = app || {};

app.userModel = (function () {
    function UserModel(requester) {
        this._requester = requester;
        this._serviceUrl = requester.baseUrl + 'user/' + requester.appId + '/';
    }

    UserModel.prototype.login = function (data) {
        var requestUrl = this._serviceUrl + 'login';

        return this._requester.post(requestUrl, data, false);
    };

    UserModel.prototype.register = function (data) {
        return this._requester.post(this._serviceUrl, data, false);
    };

    UserModel.prototype.logout = function () {
        var requestUrl = this._serviceUrl + '_logout';

        return this._requester.post(requestUrl, null, true);
    };

    return {
        load: function (requester) {
            return new UserModel(requester);
        }
    }
})();
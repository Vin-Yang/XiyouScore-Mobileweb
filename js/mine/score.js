/**
 * Created by 文鹏 on 2014/8/7.
 */
(function () {
    /*构造函数*/
    Score = function () {
    };
    Score.prototype.Api = function (data, apiName, callback) {
        var api;
        switch (apiName) {
            case 'login':
                api = '/Login/';
                break;
            case 'scores':
                api = '/Scores/';
                break;
            default :
                callback(null);
        }
        base().Ajax(data, api, callback);
    };
})();
var score = function () {
    return new Score();
};
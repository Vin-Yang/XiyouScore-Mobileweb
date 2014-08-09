/**
 * Created by 文鹏 on 2014/7/30.
 */
(function () {
    var host = "http://api.xiyoumobile.com/XiyouScoreApi";
    $.ajaxSetup({
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback"
    });
    /*构造函数*/
    Base = function () {
    };
    Base.prototype.setHost = function (value) {
        host = value;
    };
    Base.prototype.Ajax = function (data, api, callback) {
        $.ajax({
            url: host + api,
            data: data,
            success: function (res, status, xhr) {
                callback(res);
            },
            error: function (xhr, errorText, errorStatus) {
                alert(xhr.status + ':' + xhr.statusText);
            }
        });
    };
})();
var base = function () {
    return new Base();
};

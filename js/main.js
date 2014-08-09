/**
 * Created by 文鹏 on 2014/8/7.
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
var Session = getUrlParam("session");
if (Session == '' || Session == null || Session == undefined) {
    window.location.href = "index.html";
}
$(function () {
    /*绑定用户信息*/
    var data = {
        session: Session
    };
    var apiName = 'scores';
    score().Api(data, apiName, function (returnData) {
        if (returnData.Result) {
            /*学生信息*/
            var cls = returnData.Detail.Cls;
            var name = returnData.Detail.Name;
            var html = '';
            html += cls + ' ' + name;
            $('.name').append(html).trigger('create');

            /*绑定学年*/
            html = '';
            var scoreInfo = returnData.Detail.ScoreInfo;
            $.each(scoreInfo, function (index, data) {
                if (index == scoreInfo.length - 1) {
                    html += '<div data-role="collapsible" data-collapsed="false">';
                } else {
                    html += '<div data-role="collapsible">';
                }
                var year = data.Year;//学年
                html += '<h3>' + year + '</h3> ';
                var terms = data.Terms;
                html += '<fieldset class="ui-grid-a">';
                $.each(terms, function (index, data) {
                    var term = data.Term;//学期
                    if (term == '1') {
                        html += '<div class="ui-block-a"> ' +
                            '<div class="scoreList"> ' +
                            '<h4>第' + term + '学期</h4> ';
                    } else {
                        html += '<div class="ui-block-b"> ' +
                            '<div class="scoreList"> ' +
                            '<h4>第' + term + '学期</h4>';
                    }
                    var scores = data.Scores;
                    $.each(scores, function (index, data) {
                        var code = data.Code;//课程代号
                        var credit = data.Credit;//学分
                        var usualScore = data.UsualScore;//平时分数
                        if (usualScore == '') {
                            usualScore = '/';
                        }
                        var endScore = data.EndScore;//最终成绩
                        if (endScore == '' || endScore == null) {
                            endScore = usualScore;
                        }
                        var exam = data.Exam;//状态说明
                        var gpa = data.GPA;//学分绩点
                        var reScore = data.ReScore;//补考分数
                        if (reScore == '' || reScore == null) {
                            reScore = '/';
                        }
                        var school = data.School;//课程所属
                        var title = data.Title;//课程名称
                        var type = data.Type;//课程类型
                        var testScore = data.TestScore;//考试成绩
                        if (testScore == '') {
                            testScore = '/';
                        }
                        html += '<div class="scoreList-info"> ' +
                            //同过标签的属性将数据带出去
                            '<p data-code="' + code + '" data-school="' + school + '" data-type="' + type + '" data-credit="' + credit + '" data-gpa="' + gpa + '" data-usualScore="' + usualScore + '" data-testScore="' + testScore + '" data-endScore="' + endScore + '" data-reScore="' + reScore + '" data-exam="' + exam + '" ><a href="#detail" rel="dialog">' + title + '<a/></p>  ' +
                            '<p class="f12"> ' +
                            '平时:<span>' + usualScore + '</span> ' +
                            '考试:<span>' + testScore + '</span> ' +
                            '总评:<span>' + endScore + '</span> ' +
                            '</p> ' +
                            '</div> ';
                    });
                    html += '</div> ' +
                        '</div>';
                });
                html += '</fieldset>' +
                    '</div>';
            });
            $('.details').append(html).trigger('create');//加载框架的样式
            //给每一个课程绑定详情事件
            $.each($('.scoreList-info'), function (index, data) {
                $(this).on("click", function () {
                    var title = $(this).find('p').eq(0).text();
                    var code = $(this).find('p').eq(0).attr('data-code');
                    var school = $(this).find('p').eq(0).attr('data-school');
                    var type = $(this).find('p').eq(0).attr('data-type');
                    var credit = $(this).find('p').eq(0).attr('data-credit');
                    var gpa = $(this).find('p').eq(0).attr('data-gpa');
                    var usualScore = $(this).find('p').eq(0).attr('data-usualScore');
                    var testScore = $(this).find('p').eq(0).attr('data-testScore');
                    var endScore = $(this).find('p').eq(0).attr('data-endScore');
                    var reScore = $(this).find('p').eq(0).attr('data-reScore');
                    var exam = $(this).find('p').eq(0).attr('data-exam');
                    var html = '<h3 class="blue">' + title + '</h3> ' +
                        '<p><span class="blue">●课程代码: </span><span>' + code + '</span></p><hr> ' +
                        '<p><span class="blue">●开课学院: </span><span>' + school + '</span></p> <hr>' +
                        '<p><span class="blue">●课程性质: </span><span>' + type + '</span></p> <hr>' +
                        '<p><span class="blue">●学分: </span><span>' + credit + '</span></p> <hr>' +
                        '<p><span class="blue">●绩点: </span><span>' + gpa + '</span></p> <hr>' +
                        '<p><span class="blue">●平时成绩: </span><span>' + usualScore + '</span></p> <hr>' +
                        '<p><span class="blue">●考试成绩: </span><span>' + testScore + '</span></p> <hr>' +
                        '<p><span class="blue">●最终成绩: </span><span>' + endScore + '</span></p> <hr>' +
                        '<p><span class="blue">●补考成绩: </span><span>' + reScore + '</span></p> <hr>' +
                        '<p><span class="blue">●状态说明: </span><span>' + exam + '</span></p> <hr>';
                    $('.scoreDetail').empty();
                    $('.scoreDetail').append(html).trigger('create');//加载框架的样式
                });
            });
        } else {
            alert('亲，服务器实在是太忙了哦！');
            //window.location.reload();
        }
    });
});
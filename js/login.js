$(function () {
    localStorage.removeItem('basicData');
    delete window.localStorage["basicData"];
    /*
        Fullscreen background
    */
    var randomNum = Math.floor((Math.random() * 4) + 1);
    $.backstretch("../Img/background/yzu"+ randomNum + '.jpg');
    /*
        Form validation
    */
    $('.registration-form input[type="text"], .registration-form textarea').on('focus', function () {
        $(this).removeClass('input-error');
    });

    $('.registration-form').on('submit', function (e) {

        $(this).find('input[type="text"], textarea').each(function () {
            if ($(this).val() === "") {
                e.preventDefault();
                $(this).addClass('input-error');
                alert('帳號未填寫');
            }
            else {
                $(this).removeClass('input-error');
            }
        });

    });
    var uri = location.search;
    $("#form1").attr('action', '../ASHX/LoginHandler.ashx' + uri);
    $("#myBtn").click(function () {
        $("#myModal").modal();
    });
    window.onload = function () {
        var str = $.url.param("msg");
        if (str.substring(0, 5) === "error") {
            var obj = { Page: '1', Url: "Login.html" };
            alert("帳號密碼錯誤！");
            //移除error訊息
            history.pushState(obj, obj.Page, obj.Url);
        }
        //清除session
        $.ajax({
            url: '../ASHX/LoginHandler.ashx',
            data: { RequestType: 'ClearSession' },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                //console.log(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
            }
        });

        //取得校園最新消息
        $.ajax({
            url: '../api/Open/YzuNews',
            //data: { account: account },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.length > 0) {
                    for (var i = 0; i < 5; i++) {
                        $(".description").append("<p><a href='#' ><b>&nbsp" + data[i]["CreateDate"].substr(0, 10) + "&nbsp</b>" + data[i]["Title"] + "【" + data[i]["PageNameC"] + "】" + "</a></p>");
                    }
                }
            },
            beforeSend: function () {
                $('.loader').show();
            },
            complete: function () {
                $('.loader').hide();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
                alert(xhr.responseText);
            }
        });
    }
    //語言轉換

    $('.i-lan').click(function () {
        var acc = $("#acc").text() == '帳號' ? 'account' : '帳號';
        var pass = $("#pass").text() == '密碼' ? 'password' : '密碼';
        var loginTxt = $("#btnLogin").text() == '登入' ? 'Login' : '登入';
        var myBt = $("#myBtn").text() == '*新生注意' ? '*Help' : '*新生注意';
        var note = $("#acc").text() == '帳號' ? 'Forgot your password? Contact Us at Library Service Counter or Dial 4638800 ext 2321.' : '帳號為s加上您的學號，例如s921101。<br>密碼為身份証字號(英文請大寫)，登入後務必修改您的密碼！'
        $("#acc").text(acc);
        $("#pass").text(pass);
        $("input[name=txtAccount]").attr("placeholder", acc);
        $("input[name=txtPassword]").attr("placeholder", pass);
        $("#btnLogin").text(loginTxt);
        $("#myBtn").text(myBt);
        $("#noteText").text(note);
       }
    );
});

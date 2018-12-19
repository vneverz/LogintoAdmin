
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

$(function () {

    //獲取url參數
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results === null) {
            return null;
        }
        else {
            return decodeURI(results[1]) || 0;
        }
    }
    var PageID = $.urlParam("PageID");
    var Token = $.urlParam("Token");
    var pmn = $.urlParam('pmn');
    //搜尋功能
    $('#sb').keypress(function (e) {
        if (e.keyCode === 13)
            $('a.header-button-right').click();
    });
    $('a.header-button-right').click(function () {
        alert("點了搜尋");
    });
    var boxTitle;
    //專頁內容
    $.ajax({
        type: "POST",
        url: '../api/Post/PostWall',
        data: {
            Token: Token,
            PageID: PageID,
            QueryType: 'Page',
            WallFlag: '',
            Sort: 'date',
            ASC: 'desc'
        },
        success: function (item) {
            boxTitle = item[0].PageNameC;
            $('h2.box-title').text(boxTitle);
            if (pmn) $('#pageManager i').text(pmn);
            //專業中段文用body，其他進入用PageNameC
            $.each(item, function (index, val) {
                var v, temp;
                if (val.AttachmentFileName.match(/\.(jpeg|jpg|gif|png)$/)) {
                    temp = '</br><div class="pageImg"><img src="https://portalx.yzu.edu.tw/PortalSocialVB//Include/ShowImage.aspx?AttachmentID=' + val.AttachmentID + '&AttachmentFileName=' + val.AttachmentFileName + '" alt="Product Image"></div>';
                } else {
                    temp = '';
                }
                v = (val.ClickTimes === null) ? '0' : val.ClickTimes;
                $('.page-list').append('<li class="item hidden"><a href="#!" class="detail-disclosure"><div class="number">' + val.SNo + '</div><div class="story"><b>' +
                    val.Title + '</b><div class="metadata"><div class="link-text">' + val.Body + temp + '</div><span class="inline-block">' + val.CreateDate.substr(0, 10) + '</span> <span class="inline-block"> · by ' + val.AuthorName + '</span></div></div></a><span class="detail-disclosure-button"><span id="page-msg">' +
                    val.ReplyPersonNum + '</span><i class="icon bubble-icon">' + v + '</i></span></li>');
            });
            //if (item[0].PageType === 'A') {
            //    $('#pageTop .dropdown-toggle').append('<span class="caret"></span>');
            //    $('#pageTop .hList').append('<ul class="dropdown-menu"><li><a href="#">最新消息</a></li><li><a href="#">教材</a></li><li><a href="#">作業</a></li><li><a href="#">學習討論</a></li><li><a href="#">成績</a></li><li><a href="#">學生/助教</a></li><li><a href="#">課程內容</a></li></ul>');
            //}
            animateTime = 500,
            navLink = $('.detail-disclosure');
            navLink.click(function () {
                var nav = $(this).find('.story');
                if (nav.height() === 64) {
                    autoHeightAnimate(nav, animateTime);
                } else {
                    nav.stop().animate({ height: '64' }, animateTime);
                }
            });
            function loadMore() {
                //判斷全部和顯示後訊息多寡
                var no = $('.hidden').length;
                if (no !== 0) { $(".page-list .hidden").slice(0, 10).removeClass("hidden"); }
                if ((no /10) -1  < 0) { $(".box-footer").html('<span>無更多消息</span>'); }
            }
            loadMore();
            $("#aLoadMore").on("click", loadMore);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            alert(xhr.responseText);
        }
    });
    //產生專業tabs
    $.ajax({
        type: "POST",
        url: '../api/Page/MyPageMenu',
        data: {
            token: Token,
            year: '',
            smtr: '',
            cosid: '',
            cosclass:'',
            PageID: PageID,
            LevelCode:'1',
            ISSectary: '0'
        },
        success: function (items) {
            var levelOne = _.filter(items, function (num) { return num.LevelParent === null; });
            var list = ' <div class="dropdown"><button class="btn btn-success dropdown-toggle" type="button" data-toggle="dropdown" data-coursecode="' + levelOne[0].CourseCode + '">' + levelOne[0].MenuTW;
            list += '</button></div><div class="dropdown"><button class="btn btn-info" type="button" data-toggle="dropdown" data-coursecode="' + levelOne[1].CourseCode + '">' + levelOne[1].MenuTW;
            list += '</button></div><div class="dropdown"><button class="btn btn-warning" type="button" data-toggle="dropdown" data-coursecode="' + levelOne[2].CourseCode + '">' + levelOne[2].MenuTW;
            if (levelOne[3]) list += '</button></div><div class="dropdown"><button class="btn btn-primary" type="button" data-toggle="dropdown" data-coursecode="' + levelOne[3].CourseCode + '">' + levelOne[3].MenuTW;
            list += '</button></div>';
            $('.pageCover').after(list);
            var levelTwo = _.filter(items, function (num) { return num.LevelParent == 1; })
            if (levelTwo.length > 0) {
                $('#pageTop .dropdown-toggle').append('<span class="caret"></span>');
                var listTwos = '<ul class="dropdown-menu">';
                $.each(levelTwo, function (index, val) {
                    listTwos += '<li><a href="#" data-levelcode="' + levelTwo[index].LevelCode + '">' + levelTwo[index].MenuTW + '</a></li>';
                });
                listTwos += '</ul>';
                $('#pageTop .dropdown:first').append(listTwos);
            }

            //click menu
            $('.dropdown-menu li a').click(function (e) {
                e.preventDefault();
                var valTitle = $(this).text();
                var code = $(this).data("levelcode");
                var url = "../api/Page/PageCourseList";
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: {
                        token: Token,
                        PageID: PageID,
                    },
                    success: function (t) {
                        $('.box-header ').html('');
                        var lessionList = '<div class="pageSelect"><select class="form-control">';
                        $.each(t, function (i, val) {
                            lessionList += '<option>' + t[i].year + '第' + t[i].smtr + '學期' + t[i].cos_id + ' ' + t[i].cos_class + ' 班</option>';
                        });
                        lessionList += '</select></div>';
                        $('.box-header ').append(lessionList+'<h2 class="box-title">' + boxTitle + " -- " + valTitle+ '</h2>');
                        $('.rmpad').html('');
                        $('.box-footer').html('');
                        //找學期建立選單
                    }
                });
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            alert(xhr.responseText);
        }
    });


    /* Function to animate height: auto */
    function autoHeightAnimate(element, time) {
        var curHeight = element.height(), // Get Default Height
            autoHeight = element.css('height', 'auto').height(); // Get Auto Height
        element.height(curHeight); // Reset to Default Height
        element.stop().animate({ height: autoHeight }, time); // Animate to Auto Height
    }
});
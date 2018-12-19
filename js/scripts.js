$(function () {
    //先檢查要alert的訊息
    var GoOtherPage = '';
    var depColor = { "國際": "label-danger", "教務": "label-warning", "圖書": "label-info", "管理": "label-primary", "終身": "label-success", "學務": "bg-fuchsia", };
    $.ajax({
        url: '../ASHX/FirstPageHandler.ashx',
        data: { RequestType: 'LoginAlertMsg' },
        type: 'POST',
        dataType: 'json',
        //contentType: 'text/plain; charset=utf-8',
        //dataType: 'text',
        success: function (data) {
            if (data.error != null) {
                alert(data.error);
            }
            if (data.alertmsg != null) {
                if (data.alertmsg != "") {
                    alert(data.alertmsg);
                    //if (rets.alertmsg.indexOf('課程問卷未填答') > 0) {
                    //    GoOtherPage = 'https://portalx.yzu.edu.tw/PortalSocialVB/FMain/ClickMenuLog.aspx?type=App_&SysCode=A08';
                    //}
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        }
    }).complete(function () {
        if (GoOtherPage != '') {
            window.location = GoOtherPage;
        }
        else {
            //取得個人化功能表等資訊
            var t = loadBasicData();
            loadBlockPost(t);
        }
    });



    //取得個人化功能表等資訊(測試完後丟到js去，以後分享給其他專案)

    function loadBasicData() {
        //取得Token及個人化功能表等資訊(測試完後丟到js去，以後分享給其他專案)
        var Token;
        var UserName;
        var LastLoginTime;
        var gb = JSON.parse(localStorage.getItem('basicData'));
        if (gb) {
            var hours = 5; // storage hour 
            var now = new Date().getTime();
            var setupTime = gb.timestamp;
            if (now - setupTime > hours * 60 * 60 * 1000) {
                localStorage.removeItem('basicData');
                delete window.localStorage["basicData"];
            }
            loadMainBar(gb);
        } else getResource();
        function getResource() {
            $.ajax({
                url: '../ASHX/LoginHandler.ashx',
                data: { RequestType: 'Basic' },
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    data.timestamp = new Date().getTime();
                    handleData(data);
                }
            })
        }
        function handleData(responseData) {
            // Do what you want with the data
            localStorage.setItem('basicData', JSON.stringify(responseData));
            loadMainBar(responseData);
        }

        function loadMainBar(storage) {
            if (storage.Basic != null) {
                var drB = storage.Basic[0];
                if (drB.error != "") {
                    alert(drB.error);
                }
                else {
                    Token = drB.Token;
                    UserName = drB.UserName;
                    LastLoginTime = drB.LastLoginTime;
                    console.log(Token);
                }
                $('#userInfo .hidden-xs').text(UserName);
                $('.user-header p').text(UserName);
                $('.dropdown a:has(.fa-home)').attr('href', document.location.origin + '/WebForm/FirstPage.asp');
                $('.logo').attr('href', document.location.origin + '/WebForm/FirstPage.asp');
                var dtF = storage.MyFavor;
                if (dtF.length > 0) {
                    for (var f = 0; f < dtF.length; f++) {
                        $(".sidebar-menu .la-one").after("<li><a class = 'showsigh' href='/PostWall.asp?SysCode=" + dtF[f]['SysCode'] + "'><i class='fa fa-arrow-right text-info'></i> <span>" + dtF[f]['LinkNameC'] + "<small class='label pull-right bg-yellow' onclick=" + "javascript:window.location.href='https://www.yzu.edu.tw/'" + "; return false;'>-</small></span></a></li>");
                    }
                }
                console.log(storage);
                var dtP = storage.MyPage;
                if (dtP.length > 0) {
                    for (var p = 0; p < dtP.length; p++) {
                        if (dtP[p].DefaultPage === true) {
                            var urla = "PostWall.asp?PageID=" + dtP[p].PageID + "&Token=" + Token + "&pmn=" + dtP[p].PageManagerName;
                            $(".sidebar-menu .la-two").after("<li><a href='" + encodeURI(urla) + "'><i class='fa fa-arrow-right text-info'></i> <span>" + dtP[p]['PageNameC'] + "<small class='label pull-right bg-green' onclick=" + "javascript:window.location.href='https://www.yzu.edu.tw/'" + "; return false;'>+</small></span></a></li>");
                        }
                    }
                }
                var dtA = storage.MyApp;
                if (dtA.length > 0) {
                    var items = _.groupBy(storage.MyApp, 'ParentSysCode');
                    var others = _.filter(items, function (num) { return num.length === 1; });
                    var lists = _.filter(items, function (num) { return num.length !== 1; });
                    var icons = ['fa-table', 'fa-book', 'fa-file-text-o', 'fa-edit'];
                    //其他最先放所以排在最下面
                    var temp = [{ item:{SysNameC: '其他'}, icons: 'fa-folder' }];
                    $('.sidebar-menu .la-four').after(tempApp(temp));
                    for (var ot = 0; ot < others.length; ot++) {
                        $('.treeview:eq(0) .treeview-menu').append(tempAppList(others[ot]));
                    }
                    for (var l = 0 ; l < lists.length; l++) {
                        var templ = tempApp([{ item: lists[l][0], icons: icons[l] }]);
                        $('.sidebar-menu .la-four').after(templ);
                        for (var a = 1; a < lists[l].length; a++) {
                            var tempList = tempAppList([lists[l][a]]);
                            $('.treeview:eq( 0 ) .treeview-menu').append(tempList);
                        }
                    }
                }
            }
            if (window.matchMedia('(min-width: 1024px)').matches) {
                $(".showsigh").hover(function () {
                    $(this).parent().find("small").show();
                }, function () {
                    $(this).parent().find("small").hide();
                });
            }
        }
    }
    function tempApp(item) {
        var temp = '';
        $.each(item, function (index, value) {
            temp += '<li class="treeview"><a href="#"><i class="fa ' + item[index].icons + '"></i><span>' + item[index].item.SysNameC + '</span><span class="pull-right-container">';
            temp += '<i class="fa fa-angle-left pull-right"></i></span></a><ul class="treeview-menu"></ul></li>';
        });
        return temp;
    }
    function tempAppList(list) {
        var temp = url = '';
        url = '../ASHX/GoOtherSystem.ashx?SysCode=';
        $.each(list, function (index, value) {
            temp += "<li><a class='showsigh' href='" + url + value.SysCode + "'><i class='fa fa-arrow-right text-info'></i>" + value.SysNameC + "<small class='label pull-right bg-green' onclick='javascript:window.location.href='" + "https://www.yzu.edu.tw/" + "'; return false;'>+</small></a></li>";
        });
        return temp;
    }

    //取得動態牆資料
    function loadBlockPost(Token) {
        $.ajax({
            url: '../ASHX/FirstPageHandler.ashx',
            data: { RequestType: 'MyBlockPost', Token: Token },
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                var dtP = data.Posts;
                if (dtP.length > 0) {
                    var j = itemEPost = eventA = eventP = '';
                    var items = _.groupBy(dtP, 'BlockType');
                    //公告活動
                    itemEPost = _.groupBy(items.E, 'PostSource');
                    eventA = diveEvent(itemEPost.A);
                    eventP = diveEvent(itemEPost.P);
                    //課程單位社團
                    itemM = _.groupBy(items.M, 'PageType');
                    if (itemM.B) {
                        itemM.B[0].color = "bg-olive";
                        $('#wallList').append(wallList([itemM.B[0]], '我的單位', 'primary'));
                    }
                    if (itemM.D) {
                        itemM.D[0].color = "bg-olive";
                        $('#wallList').append(wallList([itemM.D[0]], '我的單位', 'primary'));
                    }
                    if (eventA.length !== 0) {
                        $('#wallList').append(wallList(eventA, '校園活動', 'warning'));
                    }
                    $('#wallList').append(wallList(eventP, '校園公告', 'warning'));
                    if (itemM.A) {
                        itemM.A = _.groupBy(itemM.A, "PageNameE");
                        $('#wallList').append(lessionList(itemM.A, '我的課程', 'success', 'bg-purple'));
                    }
                    if (itemM.C) {
                        itemM.C[0].color = "bg-olive";
                        $('#wallList').append(wallList([itemM.C[0]], '我的社團', 'danger'));
                    }
                }
                var dtE = data.Event;
                if (dtE.length > 0) {
                    var typeCode = _.groupBy(dtE, 'TypeCode');
                    for (var key in typeCode) {
                        if (key.match("^A")) {
                            typeCode[key].con = 'a';
                            //我的
                            $('#sortCalen').after(toDolist(typeCode[key], '我的行程', 'info'));
                        }
                        else if (key.match("^B")) {
                            //待辦
                            $('.col-lg-7.connectedSortable').prepend(waitNote(typeCode[key]));
                        }
                        else{
                            //全校
                            $('#sortCalen').after(toDolist(typeCode[key], '全校行事曆', 'danger'));
                        }
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
            }
        });
    }
    function wallList(data, title, color) {
        var temp = '';
        temp += '<div class="box box-' + color + '"><div class="box-header with-border"><h3 class="box-title">' + title + '</h3></div>';
        temp += '<div class="box-body"><ul class="products-list product-list-in-box">';
        $.each(data, function (index, val) {
            temp += '<li class="item"><div class="product-info"><a href="javascript:void(0)" class="product-title">' + val.CreateDate.substr(0, 10);
            temp += '<span class="label ' + val.color + ' pull-right">' + val.PageNameC + '</span></a><span class="product-description textWrap">' + val.Title + '</span>';
            if ((val.AttachmentFileName.match(/\.(jpeg|jpg|gif|png)$/)) && (index === 0)) {
                temp += '<div class="boardImg"><img src="https://portalx.yzu.edu.tw/PortalSocialVB//Include/ShowImage.aspx?AttachmentID='+ val.AttachmentID + '&AttachmentFileName=' + val.AttachmentFileName + '" alt="Product Image"></div>';
            }
            temp += '</div></li>';
        });
        temp += '</ul></div><div class="box-footer text-center"><a href="javascript:void(0)" class="uppercase">看更多訊息...</a></div></div>';
        return temp;
    }
    function lessionList(data, title, color, bg) {
        var temp = '';
        temp += '<div class="box box-' + color + '"><div class="box-header with-border"><h3 class="box-title">' + title + '</h3></div>';
        temp += '<div class="box-body"><ul class="products-list product-list-in-box">';
        $.each(data, function (index, val) {
            temp += '<li class="item"><div class="product-info"><a href="javascript:void(0)" class="product-title">' + val[0].CreateDate.substr(0, 10);
            temp += '<span class="label ' + bg + ' pull-right">' + val[0].PageNameC + '</span></a><span class="product-description textWrap">' + val[0].Title + '</span>';
            if ((val[0].AttachmentFileName.match(/\.(jpeg|jpg|gif|png)$/)) && (index === 0)) {
                temp += '<div class="boardImg"><img src="https://portalx.yzu.edu.tw/PortalSocialVB//Include/ShowImage.aspx?AttachmentID='+ val[0].AttachmentID + '&AttachmentFileName=' + val[0].AttachmentFileName + '" alt="Product Image"></div>';
            }
            temp += '</div></li>';
        });
        temp += '</ul></div><div class="box-footer text-center"><a href="javascript:void(0)" class="uppercase">看更多訊息...</a></div></div>';
        return temp;
    }
    function toDolist(list,title, color) {
        var temp = '';
        temp += '<div class="box box-'+ color +'"><div class="box-header"><i class="ion ion-clipboard"></i><h3 class="box-title">' + title + '</h3></div>';
        temp += '<div class="box-body"><ul class="todo-list">';
        $.each(list, function (index, val) {
            temp += '<li><span class="text">' + val.Title + '，' + val.StartDate.replace('T', '&nbsp;').slice(0, -3) + '~' + val.EndDate.replace('T', '&nbsp;').slice(0, -3);
            if (val.Location  === 'a') {
                temp += '，地點：' + val.Location + '。說明：' + val.Remarks + '</span>';
            }
            temp += '</li>';
        });
        temp += '</ul></div></div>';
        return temp;
    }
    function waitNote(data) {
        var temp = '';
        temp += '<div class="box box-danger" id="alertNote"><div class="box-header with-border" style="border-bottom: 1px solid #ce1f1f;"><h3 class="box-title">代辦提醒</h3>';
        temp += '</div><div class="box-body" style="background-color: #FEE;"><ul class="products-list product-list-in-box">';
        $.each(data, function (index, val) {
            temp += '<li><div><h5>'+ val.Title + '</h5><p>時間：'+ val.EndDate.replace('T','&nbsp;').slice(0,10);
            if (val.Location) {
                temp += '</br>地點：' + val.Location + '</p></div></li>';
            } 
                       
        });
        temp += '</ul></div><div class="box-footer text-center"><a href="javascript:void(0)" class="uppercase">看更多訊息...</a></div></div>';
        return temp;
    }
    //分開處理校內公告和校園活動
    function diveEvent(post) {
        var itemE, recolor, title;
        var reArr = [];
        itemE = _.groupBy(post, 'PageNameC');
        itemE = _.sortBy(itemE, function (o) { var dt = new Date(o.ActStartDate); return -dt; });
        for (j = 0; j < itemE.length; j++) {
            title = (itemE[j][0].PageNameC) ? itemE[j][0].PageNameC.substr(0, 2) : '';
            //add color
            if (depColor[title]) recolor = depColor[title];
            else recolor = "bg-purple";
            itemE[j][0].color = recolor;
            reArr.push(itemE[j][0]);
        }
        return reArr;
    }
});
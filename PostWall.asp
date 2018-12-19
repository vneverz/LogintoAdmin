<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>元智大學個人Portal</title>
    <!-- #include file ="./_header.html"-->
    <script src="../Scripts/postwall.js" type="text/javascript"></script>
</head>
<body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">
        <!-- #include file ="./_sidebar.html"-->
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content 從這替換內容-->
            <section class="content">
                <div class="row">
                    <!-- Left col -->
                    <section>
                        <div class="boxPage">
                            <div id="pageTop">
                                <div class="pageCover"></div>
                                <span id="pageManager"><i class="fa fa-street-view" aria-hidden="true"></i></span>
                            </div>
                            <div class="box-header with-border">
                                <a href="#" class="header-button header-button-left" id="view-home-refresh">
                                    <button><i class="icon-refresh">Refresh</i></button></a>
                                <h2 class="box-title"></h2>

                                 
                                <input id="sb" type="text" placeholder="搜尋" onkeypress="return callSearchInput(event);">
                                <a class="header-button header-button-icon header-button-right">
                                    <button><i class="icon-search">search</i></button></a>
                            </div>
                            <div class="box-body rmpad">
                                <ul class="products-list product-list-in-box page-list">
                                </ul>
                            </div>
                            <div class="box-footer text-center">
                                <a href="javascript:void(0)" id="aLoadMore">看更多訊息...</a>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <!-- /.content -->

        </div>
        <footer class="main-footer">
            <div class="pull-right hidden-xs">
                <b>Version</b> 2.3.12
            </div>
            <strong>Copyright &copy; 2017 <a href="https://www.yzu.edu.tw/">Yuan Ze University</a>.</strong> All rights
    reserved.
        </footer>
        <!-- /.content-wrapper -->
    </div>
    <!-- End wrapper -->
    <!-- Control Sidebar -->
    <div id="target"></div>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
     immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
</body>
</html>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>元智大學個人Portal</title>
    <!-- #include file ="./_header.html"-->
</head>
<body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">
        <!-- #include file ="./_sidebar.html"-->
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content 從這替換內容-->
            <section class="content">
                <!-- Small boxes (Stat box) -->
                <!-- Main row -->
                <div class="row">
                    <!-- Left col -->
                    <section class="col-lg-7 connectedSortable" id="wallList">
                        <!-- PRODUCT LIST -->
                    </section>
                    <!-- /.Left col -->
                    <!-- right col (We are only adding the ID to make the widgets sortable)-->
                    <section class="col-lg-5 connectedSortable">
                        <!-- Calendar -->
                        <div class="box box-solid bg-green-gradient" id="sortCalen">
                            <div class="box-header">
                                <i class="fa fa-calendar"></i>

                                <h3 class="box-title">Calendar</h3>
                                <!-- tools box -->
                                <div class="pull-right box-tools">
                                    <!-- button with a dropdown -->
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                            <i class="fa fa-bars"></i>
                                        </button>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm" data-widget="collapse">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <!-- /. tools -->
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body no-padding">
                                <!--The calendar -->
                                <div id="calendar" style="width: 100%"></div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                        <!-- /.box -->
                    </section>
                    <!-- right col -->
                </div>
                <!-- /.row (main row) -->

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

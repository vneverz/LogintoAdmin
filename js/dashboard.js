/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

$(function () {
    //Make the dashboard widgets sortable Using jquery UI
    $(".connectedSortable").sortable({
        placeholder: "sort-highlight",
        connectWith: ".connectedSortable",
        handle: ".box-header, .nav-tabs",
        forcePlaceholderSize: true,
        zIndex: 999999,
        start: function (event, ui) {
            ui.item.startPos = ui.item.index();
        },
        stop: function (event, ui) {
            console.log(ui.item.attr('id') +" New position: " + ui.item.index());
        }
    });
    $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");
    //The Calender
    $("#calendar").datepicker();

});

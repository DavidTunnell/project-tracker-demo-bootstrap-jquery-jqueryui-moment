$(document).ready(function() {
    //get and format current datetime then set it on an 1 sec interval
    var currentDateTime;
    setInterval(function() {
        currentDateTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        $(".date-time").text(currentDateTime);
    }, 1000);
    //set current year
    $(".current-year").text(moment().format('YYYY'));
    //open modal on add project button click
    $('.btn-primary').on('click', function() {
        $(".modal").dialog({
            width: 580,
            height: 635,
            modal: true
        });
    })

});
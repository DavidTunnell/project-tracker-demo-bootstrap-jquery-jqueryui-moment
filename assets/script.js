$(document).ready(function() {
    //DOM elements
    var dateTimeEl = $(".date-time");
    var currentYearEl = $(".current-year");
    var addProjectButton = $('.add-project');
    var saveProjectButton = $('.save-project');
    var datePickerInput = $(".date-picker");
    var projectNameInput = $(".project-name");
    var projectTypeInput = $(".project-type");
    var hourlyRateInput = $(".hourly-rate");
    var projectTableEl = $(".project-table");
    var modalEl = $(".modal");
    var userValidationEl = $(".input-validation");
    //get and format current datetime then set it on an 1 sec interval
    var currentDateTime;
    setInterval(function() {
        currentDateTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        dateTimeEl.text(currentDateTime);
    }, 1000);
    //set current year
    currentYearEl.text(moment().format('YYYY'));
    //open modal on add project button click w/ jQueryUI
    addProjectButton.on('click', function() {
        userValidationEl.addClass('hide');
        modalEl.dialog({
            width: 580,
            height: 675,
            modal: true
        });
    });
    //save button on click function
    saveProjectButton.on('click', function() {
        if (projectNameInput.val() && projectTypeInput.val() && datePickerInput.val() && hourlyRateInput.val()) {
            printToTable(projectNameInput.val(), projectTypeInput.val(), hourlyRateInput.val(), datePickerInput.val());
            modalEl.dialog('close');
            //clear fields
            datePickerInput.val('');
            projectNameInput.val('');
            projectTypeInput.prop('selectedIndex', 0);
            hourlyRateInput.val('');

        } else {
            userValidationEl.removeClass('hide');
        }
    });
    //create a table row and append it
    function printToTable(projectName, projectType, hourlyRate, dueDate) {
        //delete button variable and add
        var newRow = '<tr><td>' + projectName +
            '</td><td>' + projectType +
            '</td><td>$' + hourlyRate +
            '</td><td>' + dueDate +
            '</td><td>' + calculateDaysLeft(dueDate) +
            '</td><td>$' + calculatePotentialEarnings(hourlyRate, dueDate) + '</td><td><button type="button" class="btn btn-danger">Delete</button></td></tr>';
        projectTableEl.append(newRow);

    }
    // calculates how many dates left until the due date 
    function calculateDaysLeft(dueDate) {
        //get current datetime
        var currentDay = moment();
        //return the difference
        return (currentDay.diff(dueDate, 'days') * -1) + 1;
    }
    //calculate potential earning (8 hour work day)
    function calculatePotentialEarnings(hourlyRate, dueDate) {
        return (hourlyRate * 8) * calculateDaysLeft(dueDate);
    }
});
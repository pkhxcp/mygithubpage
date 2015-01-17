document.getElementById("add-class-button").onclick = function() {

    var className = document.getElementById("class-name").value;

    var creditHours = document.getElementById("credit-hours").value;

    var professor = document.getElementById("professor").value;

    var inputFields = document.getElementsByTagName('input');
    var numInputFields = inputFields.length;

    var checkedDays = [];
    var mustTake = false;
    var start;
    var end;
    var startRadio = "am";
    var endRadio = "am";

    for (var i = 0; i < numInputFields; i++) {

        if (inputFields[i].type == 'checkbox' &&
            inputFields[i].name == 'day-week' &&
            inputFields[i].checked == true) {
            checkedDays.push(inputFields[i].value);
        } else if (inputFields[i].id == 'semester-radio-yes' && inputFields[i].checked) {
            mustTake = true;
        } else if (inputFields[i].id == 'start-time-box') {
            start = inputFields[i].value;
        } else if (inputFields[i].id == 'end-time-box') {
            end = inputFields[i].value;
        } else if (inputFields[i].id == 'start-radio-pm' && inputFields[i].checked) {
            startRadio = "pm";
        } else if (inputFields[i].id == 'end-radio-pm' && inputFields[i].checked) {
            endRadio = "pm";
        }
    }

    if (className == "" || start == "" || end == "") {
        alert("All fields but professor are required");
    } else {

        var startHour = start.substring(0,2);
        var startMinute = start.substring(3,5);
        var endHour = end.substring(0,2);
        var endMinute = end.substring(3,5);

        startHour = removeFrontZero(startHour);
        startMinute = removeFrontZero(startMinute);
        endHour = removeFrontZero(endHour);
        endMinute = removeFrontZero(endMinute);

        var startTime = getTime(Number(startHour), Number(startMinute), startRadio);

        var endTime = getTime(Number(endHour), Number(endMinute), endRadio);

        //also have array called checkedDays
        alert("yo \n" + className + "\n" + creditHours + "\n" + professor + "\n" + startTime + "\n" + endTime + "\n" + mustTake);
    }
}

function removeFrontZero(input) {

    if (input.substring(0,1) == '0') {
        return input.substring(1,2);
    }
    else
        return input;
}

document.getElementById("optimize-button").onclick = function() {

    alert("hooptimizing...");

    var minClasses = document.getElementById("min-classes").value;
    var maxClasses = document.getElementById("max-classes").value;
    var minCredits = document.getElementById("min-hours").value;
    var maxCredits = document.getElementById("max-hours").value;


    alert(minClasses + " " + maxClasses + " " + minCredits + " " + maxCredits);
    

}

function getTime(hours, minutes, period) {

    hours += minutes / 60;

    period = period.toLowerCase();

    if (period == "pm") {
        hours += 12;
    }

    return hours;
}
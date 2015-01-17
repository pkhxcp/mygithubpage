document.getElementById("add-class-button").onclick = function() {

    var className = document.getElementById("class-name").value;

    var creditHours = document.getElementById("credit-hours").value;

    var inputFields = document.getElementsByTagName('input');
    var numInputFields = inputFields.length;

    var checkedDays = [];
    var mustTake = false;
    var start;
    var end;
    //start radio pm
    var srpm;
    //end radio pm
    var erpm;

    for (var i = 0; i < numInputFields; i++) {

        if (inputFields[i].type == 'checkbox' &&
            inputFields[i].name == 'day-week' &&
            inputFields[i].checked == true) {
            checkedDays.push(inputFields[i].value);
        } else if (inputFields[i].id == 'semester-radio-yes' && inputFields[i].checked) {
            mustTake = true;
        } 
        else if (inputFields[i].id == 'start-time-box') {
             start = inputFields[i].value;
        }
        else if (inputFields[i].id == 'end-time-box') {
             end = inputFields[i].value;
        }
        else if (inputFields[i].id == 'start-radio-pm') {
             srpm = inputFields[i].checked;
        }
        else if (inputFields[i].id == 'end-radio-pm') {
             erpm = inputFields[i].checked;
        }


        //TODO change that ass
        var startTime = getTime(11, 30, "AM");


        var endTime = getTime(1, 0, "PM");

        //if ()
        

        //alert(inputFields[i].id);

    }

    alert("yo \n" + className + "\n" + creditHours + "\n" + startTime + "\n" + endTime + "\n" + mustTake);


}

document.getElementById("optimize-button").onclick = function() {

    alert("hooptimizing...");

}

function getTime(hours, minutes, period) {

    hours += minutes / 60;

    period = period.toLowerCase();

    if (period == "pm") {
        hours += 12;
    }

    return hours;
}
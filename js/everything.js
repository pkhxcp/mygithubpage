document.getElementById("add-class-button").onclick = function() {

    var className = document.getElementById("class-name").value;

    var creditHours = document.getElementById("credit-hours").value;

    //TODO change that ass
    var startTime = getTime(11, 30, "AM");
    var endTime = getTime(1, 0, "PM");


    var inputFields = document.getElementsByTagName('input');
    var numInputFields = inputFields.length;

    var checkedDays = [];
    var mustTake = false;

    for (var i = 0; i < numInputFields; i++) {

        if (inputFields[i].type == 'checkbox' &&
            inputFields[i].name == 'day-week' &&
            inputFields[i].checked == true) {
            checkedDays.push(inputFields[i].value);
        } else if (inputFields[i].id == 'semester-radio-yes' && inputFields[i].checked) {
            mustTake = true;
        }

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
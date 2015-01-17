document.getElementById("add-class-button").onclick = function(){ 

	

 	var className = document.getElementById("class-name").value;

	var creditHours = document.getElementById("credit-hours").value;

	//TODO change that ass
	var startTime = getTime(11, 30, "AM");
	//var endTime = getTime(1, 0, "PM");

	alert(startTime); 

	alert("yo \n" + className + "\n" + creditHours + "\n");


}

document.getElementById("optimize-button").onclick = function(){ 

	alert("hooptimizing...");

}

function getTime(hours, minutes, period) {

	hours += minutes/60;

	period = period.toLowerCase();

	if (period == "pm") {
		hours += 12;
	}

    return hours;
}
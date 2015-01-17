document.getElementById("add-class-button").onclick = function(){ 

	

	var className = document.getElementById("class-name").value;

	var creditHours = document.getElementById("credit-hours").value;

	//TODO change that ass
	var startTime = getTime(11, 30, "AM");
	var endTime = getTime(1, 0, "PM");

	//var monday = document.getElementById("M").value;
	
	//alert(document.querySelector('.checkbox:checked').value);

	//gets all the input tags in frm, and their number
	var inputFields = document.getElementsByTagName('input');
	var numInputFields = inputFields.length;

	var checkedDays = [];

  //traverse the inpfields elements, and adds the value of selected (checked) checkbox in selchbox
  for(var i = 0; i < numInputFields; i++) {

  	if(inputFields[i].type == 'checkbox' && inputFields[i].checked == true /*&& inputFields[i].class == 'days*/) {

  		alert(inputFields[i].name);
  		alert("found one");
  	}
  }


  alert("yo \n" + className + "\n" + creditHours + "\n" + startTime + "\n" + endTime);


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
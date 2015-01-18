
//Globals
var COURSES = [];

var isFirstEntry=true;
var count = 0;
var pixelthing = 0;
var zindex=29;

document.getElementById("add-class-button").onclick = function() {

    var className = document.getElementById("class-name").value.toLowerCase();

    var creditHours = document.getElementById("credit-hours").value;

    var professor = document.getElementById("professor").value.toLowerCase();

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

        var course = {
            className: className,
            creditHours: creditHours,
            professor: professor,
            startTime: startTime,
            endTime: endTime,
            days: checkedDays,
            mustTake: mustTake
        };

        COURSES[COURSES.length] = course;
    }



    if(isFirstEntry){
        var $newguy = $('<li><button type="button" class="class-btn" id="class-name-num0" >'+className+'</button></li>');
        $("#class-name-num0").css({'display':"block"});
        $("#class-listing").append($newguy);
        $("#class-name-num0").animate({'marginTop':-375},500);
        $("#class-modal-button").animate({
           'marginTop':"-=302px"},500)
        .parent().css('z-index', 9),
        $("#optimizer").fadeIn()
        isFirstEntry = false;
    }
    else{
        count++;
        pixelthing+=73*count;
        var $newguy = $('<li><button type="button" class="class-btn-new" id="class-name-num'+count+'" >'+className+'</button></li>');
        $("#class-name-num"+(count-1)).append($newguy);
        $("#class-name-num"+count).css({'display':"block"//,
                                        //'z-index': ""+zindex
                                        //'top':"calc(inherit+30px)"
                                    });
                                    zindex--;
        $("#class-modal-button").animate({
           'marginTop':"+=74px"},500);
        $("#class-name-num"+count).animate({'marginTop':+38},500);
        
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

    var minClasses = document.getElementById("min-classes").value;
    var maxClasses = document.getElementById("max-classes").value;
    var minCredits = document.getElementById("min-hours").value;
    var maxCredits = document.getElementById("max-hours").value;

    console.log(minClasses + " " + maxClasses + " " + minCredits + " " + maxCredits);


    //will become the set of all subsets of the COURSES array
    var restrictedPowerSet = getRestrictedPowerSet(COURSES, minClasses, maxClasses, minCredits, maxCredits);

    //print the powerset to console
    for (var i = 0; i < restrictedPowerSet.length; i++) {
        for (var j = 0; j < restrictedPowerSet[i].length; j++) {
            console.log(restrictedPowerSet[i][j].className + " " + restrictedPowerSet[i][j].professor);
        }
        console.log("_______________");
    }
    
    alert("print done, set size was " + COURSES.length + " classes, " +
        restrictedPowerSet.length + " possible schedules generated");
}

function getTime(hours, minutes, period) {

    hours += minutes / 60;

    period = period.toLowerCase();

    if (period == "pm") {
        hours += 12;
    }

    return hours;
}

function createTable(tablecount){
    var $newguy = $('<div class="table-divider" id="table'+tablecount+'"><table style="width:100%"><tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr><tr><td><div class="table-div" id="sunday-div'+tablecount+'"></div></td><td><div class="table-div" id="monday-div'+tablecount+'"></div></td><td><div class="table-div" id="tuesday-div'+tablecount+'"></div></td><td><div class="table-div" id="wednesday-div'+tablecount+'"></div></td><td><div class="table-div" id="thursday-div'+tablecount+'"></div></td><td><div class="table-div" id="friday-div'+tablecount+'"></div></td><td><div class="table-div" id="saturday-div'+tablecount+'"></div></td></tr></table></div>');
        $newguy.appendTo(document.body);
}

function animateout(num){
    $("#class-name-num"+num+"").animate({'marginTop':"-=1600px"},1000+50*num);
}

function makeSchedule(maxtime,mintime,)
$("#btn-opt-close").click(function(){
    if(count!=0){

    for( var i=0; i<count ;i++){

        animateout(i);
    }
}
    else{
        $("#class-name-num0").animate({'marginTop':"-=1600px"},1000);
    }

     $("#class-modal-button").animate({
           'marginTop':"-=1600px"},500);

     $("#optimizer").animate({
           'marginTop':"-=1600px"},500);

     var num = 7;

     for(var i =0; i<num; i++){
        createTable(i);
     }


      

    var $coolguy = $('<div class="school"></div>');
    $coolguy.css({'height':"720px"});
    $("#sunday-div0").append($coolguy);

    var $coolguy1 = $('<div class="school"><div class="table-time-start">8:15</div><div class="table-class">EECS 338<div class="table-professor">T Pech</div></div><div class="table-time-end">9:15</div></div>');
    $coolguy1.css({'height':"67.5px",
                    'position':"relative"});
    $("#monday-div0").append($coolguy1);


//TODO dynamic table gen
        // var $newguy1 = $('<div class="table-divider"><table style="width:100%"><tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr><tr><td><div class="table-div sunday-div"></td><td><div class="table-div monday-div"></td><td><div class="table-div tuesday-div"></td><td><div class="table-div wednesday-div"></td><td><div class="table-div thursday-div"></td><td><div class="table-div friday-div"></td><td><div class="table-div saturday-div"></td></tr></table></div>');
        // $newguy1.appendTo(document.body);




    
    //alert("fuckyou");
});


//returns a list of lists of classes that are possible schedule combinations
function getRestrictedPowerSet(coursesSet, minClasses, maxClasses, minCredits, maxCredits) {

    //TODO ensure the "must take" classes are actually required


    var fullPowerSet = [[]];
    var partialPowerSet = [[]];
    
    console.log("1");

    for (var i=0; i < coursesSet.length; i++) {
        console.log("2");
        for (var j = 0, powerSetLength = fullPowerSet.length; j < powerSetLength; j++) {
            console.log("3");
            //prevents the same class from occurring more than once in a schedule.
            //this can occur when a class is offered at multiple times and/or by multiple professors
            if(!containsCourse(fullPowerSet[j], coursesSet[i].className)) {
                console.log("4");

                //a potential schedule, lets see if it fits our criteria
                var candidateSet = fullPowerSet[j].concat(coursesSet[i]);
                var CandidateIsValid = true;

                if (candidateSet.length < minClasses || candidateSet.length > maxClasses) {
                    console.log("5 false " + candidateSet.length);
                    CandidateIsValid = false;
                }
                else {
                    console.log("6");

                    var total = sumCreditHours(candidateSet);

                    if(total > maxCredits || total < minCredits) {
                        console.log("7 false");
                        CandidateIsValid = false;
                    }
                    else {
                        console.log("8");

                    


                        //prevent overlapping times
                    }
                }

                //only add valid candidates to the partial powerset
                if (CandidateIsValid)
                    partialPowerSet.push(candidateSet);
            }

            //alway add candidate set to fullPowerSet
            fullPowerSet.push(candidateSet);
        }
    }
    return partialPowerSet;
}

function sumCreditHours(candidateSet) {

    var sum = 0;

    for (var i = 0; i < candidateSet.length; i++) {
        sum += Number(candidateSet[i].creditHours);
    }

    return sum;
}

function containsCourse(classSet, className) {

    for (var i = 0; i < classSet.length; i++) {
        if (classSet[i].className == className)
            return true;
    }
    return false;
}

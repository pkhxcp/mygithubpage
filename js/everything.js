
//Globals
var COURSES = [];

var isFirstEntry=true;
var count = 1;
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


//TODO move 'Number' up, change 12's to 0's
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
        count++;
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
            console.log(restrictedPowerSet[i][j].className + " " + restrictedPowerSet[i][j].creditHours + " " + restrictedPowerSet[i][j].professor + " " + restrictedPowerSet[i][j].startTime + " " + restrictedPowerSet[i][j].endTime + " " + restrictedPowerSet[i][j].days.toString() + " " + restrictedPowerSet[i][j].mustTake);
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

//Phil's crap
// $("#optimizer").click(function(){
//     $('#class-name-num').animate({'marginTop:':"-=375px"},500);
// });


//returns a list of lists of classes that are possible schedule combinations
function getRestrictedPowerSet(coursesSet, minClasses, maxClasses, minCredits, maxCredits) {

    var requiredClassNames = [];

    for (var i = 0; i < coursesSet.length; i++) {
        if (coursesSet[i].mustTake && !nameSetContains(requiredClassNames, coursesSet[i].className)) 
            requiredClassNames.push(coursesSet[i].className);
    }

    alert("number of required is " + requiredClassNames.length);

    var fullPowerSet = [[]];
    var partialPowerSet = [[]];
    

    for (var i=0; i < coursesSet.length; i++) {

        for (var j = 0, powerSetLength = fullPowerSet.length; j < powerSetLength; j++) {
            
            //prevents the same class from occurring more than once in a schedule.
            //this can occur when a class is offered at multiple times and/or by multiple professors
            //
            //also prevents the class from being added if it overlaps with any other class
            if(!containsCourse(fullPowerSet[j], coursesSet[i].className) &&
                !overlaps(coursesSet[i], fullPowerSet[j])) {
 

                //a potential schedule, lets see if it fits our criteria
                var candidateSet = fullPowerSet[j].concat(coursesSet[i]);

                var CandidateIsValid = true;

                if (candidateSet.length < minClasses || candidateSet.length > maxClasses) {

                    CandidateIsValid = false;
                }
                else {
     

                    var total = sumCreditHours(candidateSet);

                    if(total > maxCredits || total < minCredits) {
              
                        CandidateIsValid = false;
                    }
                    else {


                        //check that candidate set has all of the classes marked as 'must take'
                        for (var k = 0; k < requiredClassNames.length; k++) {
                            var weGucci = false;

                            for (var m = 0; m < candidateSet.length; m++) {
                                if (candidateSet[m].className == requiredClassNames[k]) {
                                    weGucci = true;
                                    break;
                                }
                            }

                            if(!weGucci) {
                                CandidateIsValid = false;
                                break;
                            }
                        }
                    }
                }

                //only add valid candidates to the partial powerset
                //and only if they are not already in the partial powerset
                if (CandidateIsValid && !contains(partialPowerSet, candidateSet)) {
                    partialPowerSet.push(candidateSet);
                }
            }

            //alway add candidate set to fullPowerSet
            fullPowerSet.push(candidateSet);
        }
    }
    //get rid of the first element because 
    partialPowerSet.shift();
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

function nameSetContains(nameSet, name) {
    for (var i = 0; i < nameSet.length; i ++) {
        if (nameSet[i] == name)
            return true;
    }
    return false;
}

//determines whether the given course overlaps with any in courseList
function overlaps(course, courseList) {

    for (var i = 0; i < courseList.length; i++) {

        if (overlapsWith(courseList[i], course))
            return true;
    }
    return false;
}

function overlapsWith(course1, course2) {
    
    var sharedDays = intersect(course1.days, course2.days);

    if(sharedDays.length > 0) {

        if (course1.startTime != course2.startTime &&
            course1.endTime != course2.endTime &&
            !isBetween(course1.startTime, course2.startTime, course1.endTime) && 
            !isBetween(course1.startTime, course2.endTime, course1.endTime)) {
            return false
        }
        else
            return true;
    }
    return false;
}

//finds the intersection of two arrays
function intersect(a, b) {
    var tmp;
    if (b.length > a.length)
        tmp = b, b = a, a = tmp; // indexOf to loop over shorter
    return a.filter(
        function (e) {
            if (b.indexOf(e) !== -1)
                return true;
        }
    );
}

//is the 2nd param between the first and third? (exclusive)
function isBetween(a, b, c) {
    if (a < b && b < c)
        return true;
    else return false;
}

//set MUST be a list of schedules and element MUST be a schedule
function contains(set, element) {
    for (var i = 0; i < set.length; i++) {
        if (schedulesAreEqual(set[i], element))
            return true;
    }
    return false;
}

function schedulesAreEqual(schedule1, schedule2) {

    if (schedule1.length != schedule2.length)
        return false;

    var numEqual = 0;

    for (var i = 0; i < schedule1.length; i++) {

        for (var j = 0; j < schedule2.length; j++) {

            if (coursesAreEqual(schedule1[i], schedule2[j])) {
                numEqual++;
            }
        }
    }
    if (numEqual == schedule1.length) {
        return true;
    }
    else {
        return false;
    }
}

function coursesAreEqual(course1, course2) {

    if (course1.className == course2.className &&
        course1.creditHours == course2.creditHours &&
        course1.professor == course2.professor &&
        course1.startTime == course2.startTime &&
        course1.endTime == course2.endTime &&
        arraysAreEqual(course1.days, course2.days) &&
        course1.mustTake == course2.mustTake) {

        return true;
    }
    else
        return false;
}
        
function arraysAreEqual(array1, array2) {

    if (array1.length != array2.length)
        return false;

    for (var i = 0; i < array1.length; i++) {

        if (array1[i] != array2[i])
            return false;
    }
    return true;

}














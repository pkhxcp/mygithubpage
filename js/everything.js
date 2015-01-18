
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

        startHour = Number(removeFrontZero(startHour));
        startMinute = Number(removeFrontZero(startMinute));
        endHour = Number(removeFrontZero(endHour));
        endMinute = Number(removeFrontZero(endMinute));

        if (startHour == 12)
            startHour = 0;

        if (endHour == 12)
            endHour = 0;

//TODO move 'Number' up, change 12's to 0's
        var startTime = getTime(startHour, startMinute, startRadio);

        var endTime = getTime(endHour, endMinute, endRadio);

        alert(startTime + " " + endTime);

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

function getDuration(course){
    return (course.startTime-course.endTime)*60;

}

function getTimeFromDec(hours){
    var hourstring= "";
    var minstring= "";
    var periodstring= "";
    if(hours>=12){
        periodstring="pm";
        hours-=12;
    }
    else{
        periodstring="am";
    }
    hourstring = ""+Math.floor(hours)+"";
    minstring = ""+(hours-Math.floor(hours))*60+"";
    return ""+hourstring+":"+minstring+periodstring;
    

}

function createTable(tablecount){
    var $newguy = $('<div class="table-divider" id="table'+tablecount+'"><table style="width:100%"><tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr><tr><td><div class="table-div" id="sunday-div'+tablecount+'"></div></td><td><div class="table-div" id="monday-div'+tablecount+'"></div></td><td><div class="table-div" id="tuesday-div'+tablecount+'"></div></td><td><div class="table-div" id="wednesday-div'+tablecount+'"></div></td><td><div class="table-div" id="thursday-div'+tablecount+'"></div></td><td><div class="table-div" id="friday-div'+tablecount+'"></div></td><td><div class="table-div" id="saturday-div'+tablecount+'"></div></td></tr></table></div>');
        $newguy.appendTo(document.body);
}

function animateout(num){
    $("#class-name-num"+num+"").animate({'marginTop':"-=1600px"},1000+50*num);
}

function blankTime(duration,tablenum,day){
    var $coolguy = $('<div class="school"></div>');
    $coolguy.css({'height':""+duration*1.5+"px",
                    'background-color':"transparent"});
    $("#"+day+"-div"+tablenum+"").append($coolguy);
}

function addTime(course,tablenum){
    var $coolguy = $('<div class="school"><div class="table-time-start">'+getTimeFromDec(course.startTime)+'</div><div class="table-class">'+course.className+'<div class="table-professor">'+course.professor+'</div></div><div class="table-time-end">'+getTimeFromDec(course.endTime)+'</div></div>');
    $coolguy.css({'height':""+getDuration(course)*1.5+"px",
                    'background-color':"transparent"});

    //TODO figure out how to do days
    $("#"+day+"-div"+tablenum+"").append($coolguy);
}

function sortDays(course){

var MArray =[];
var TuArray=[];
var WArray=[];
var ThArray=[];
var FArray=[];
var SaArray=[];
var SuArray=[];
var weekArray = [SuArray,MArray,TuArray,WArray,ThArray,FArray,SaArray];

for(var i=0;i<course.length;i++){
    for(var j=0;j<course.days.length;j++){
        if(course.days[j]=="Su"){
            SuArray.push(course);
        }
        else if(course.days[j]=="M"){
            MArray.push(course);
        }
        else if(course.days[j]=="Tu"){
            TuArray.push(course);
        }
        else if(course.days[j]=="W"){
            WArray.push(course);
        }
        else if(course.days[j]=="Th"){
            ThArray.push(course);
        }
        else if(course.days[j]=="F"){
            FArray.push(course);
        }
        else if(course.days[j]=="Sa"){
            SaArray.push(course);
        }
    }
}

for(var w=0; w<weekArray.length;w++){
    weekArray[w].sort(function (a, b)
    {
        return a-b;
    });
}
return weekArray;
}




//tools at disposal: blankTime, addTime, createTable, getDuration, getTimeFromDec






//TEST FUNCTION TO DELETE AFTER COMPLETE IMPLEMENTATION OF SCHEDULING
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

    var $coolguy1 = $('<div class="school"><div class="table-time-start">'+getTimeFromDec(getTime(8,15,"am"))+'</div><div class="table-class">EECS 338<div class="table-professor">T Pech</div></div><div class="table-time-end">9:15</div></div>');
    $coolguy1.css({'height':"67.5px",
                    'position':"relative"});
    $("#monday-div0").append($coolguy1);

    blankTime(60,0,"monday");


//TODO dynamic table gen
        // var $newguy1 = $('<div class="table-divider"><table style="width:100%"><tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr><tr><td><div class="table-div sunday-div"></td><td><div class="table-div monday-div"></td><td><div class="table-div tuesday-div"></td><td><div class="table-div wednesday-div"></td><td><div class="table-div thursday-div"></td><td><div class="table-div friday-div"></td><td><div class="table-div saturday-div"></td></tr></table></div>');
        // $newguy1.appendTo(document.body);




    
    //alert("fuckyou");
});





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














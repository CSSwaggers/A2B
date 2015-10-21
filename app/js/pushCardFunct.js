// Description: 				Creates "n" number of MDL cards that displays run details(Time,Distance,Type*RUN-ONLY*,Date,Name)
//	Formal Parameters: 	First four Parameters(pathDate,pathName,pathDistance,pathTime) that has an element per run. eg pathDate=[DateofRun_0,DateofRun_1,DateofRun_2..];
//								:	The last Parameter, pathArray contains elements which has details regarding each turn for every run pathArray=[[lng,lat...*Run0*],[lng,lat...*Run1*],...]

function pushCarddisp(pathID, pathDate, pathName, pathDistance, pathTime,pathArray,sortArrayin){
		var arrayLength=pathName.length;	// the "n" value which determines the number of cards that is going to be created
		var sortArray=[];
		
	if (sortArrayin==undefined){
		for (var n = 0; n < arrayLength; n++)
			sortArray[n]=n;
	}
	else{
		sortArray=sortArrayin;
	}
	
	
	for (var j = 0; j < arrayLength; j++) {
		var i=sortArray[j];
		// Creates new card as Divs in the HTML
		document.getElementById('homepage-card-whole').innerHTML+="<div id='homepage-card-whole-"+pathID[j]+"'>"  +    
	"<div class='mdl-card mdl-shadow--2dp demo-card-wide'>"+
	"<div id='homepage-card-hat'>"+
	"<div class='.mdl-card__media map-hidden' id='homepage-card-hat-map-"+i+"'>"+
	"<div id='map"+i+"' style='width:100%;height:35vh; padding-top:0;'> "+
	"</div></div>"+
	"<div class='mdl-card__title' style='display:inline;'>"+
    " <button class='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'  data-upgraded=',MaterialButton,MaterialRipple' style='color: rgba(0, 0, 0, 0.54);position:relative;left:86.2%;' onclick='routeDelete("+pathID[j]+")'><i class='material-icons'>delete</i></button>"+
	"<a class='mdl-typography--display-3 mdl-typography--font run-name-class' style='font-size:8vh;position:absolute;left:2%;' id='run-name-"+i+"' href='javascript:dispMap("+i+"),initialize("+i+","+JSON.stringify(pathArray[i])+")' >Name of Run<i class='material-icons'>chevron_right</i></a>"+
	"</div> </div>"+
    "<div class='mdl-card__title-text' style='font-size:2.5vh;position:relative;left:-47.9%;bottom:-4.5vh;color:grey;width:50%' id='run-date-"+i+"' >date</div>"+
    "<div class='mdl-typography--display-2 mdl-typography--font' style='font-size:5.5vh;position:relative;left:1.9%;bottom:-4.7vh;'> <i id='type"+i+"' class='material-icons'>--</i> <label id='distance"+i+"'>--</label><label>km</label></div>"+
    "<div class='mdl-typography--display-2 mdl-typography--font' style='font-size:5.5vh;position:relative;left:1.9%;bottom:-3.7vh;'> <i id='type"+i+"' class='material-icons'>timer</i> <label id='time"+i+"'>--</label></div>"+
	"<div class='mdl-typography--display-2 mdl-typography--font' style='font-size:5.5vh;position:relative;left:1.9%;bottom:-2.7vh;'> <i id='type"+i+"' class='material-icons'>trending_up</i>  <label id='Speed"+i+"'>--</label><label>km/h</label></div>"+ 
    "<div class='mdl-typography--display-2 mdl-typography--font' style='font-size:5.5vh;position:relative;left:1.9%;bottom:-1.7vh;'> <i id='type"+i+"' class='material-icons'>accessibility</i>  <label id='Calories"+i+"'>--</label><label>Cals</label></div>"+
    
    "<div class='mdl-card__actions'></div>"+
	"<div class='mdl-card__menu'>"+
	"</div></div>";
			
			
			
			// Calculations - Time, Average speed 
			var totalDistance=Math.round(pathDistance[i]*1000)/1000;
			var timeStringMins = Math.floor(pathTime[i]/1000/60);
            var timeStringSeconds = Math.floor(pathTime[i]/1000 - timeStringMins*60);
			var totalHours=(timeStringMins/60)+(timeStringSeconds/3600);
			
			
			var Speed=Math.ceil((pathDistance[i]/totalHours)*100)/100
			if (Speed<1){ Speed=0}
			

			// Pushing out values for each SPECIFIC cards
			var IDdistance="distance"+i;
			var IDtime="time"+i;
			var IDname="run-name-"+i;
			var IDdate="run-date-"+i;
            var IDtype="type"+i;
			var IDspeed="Speed"+i;
			var IDcalories="Calories"+i;
			
			document.getElementById(IDname).innerHTML=pathName[i];
			document.getElementById(IDdistance).innerHTML=totalDistance;
			document.getElementById(IDspeed).innerHTML=Speed;
			document.getElementById(IDtime).innerHTML=timeStringMins + 'min ' + timeStringSeconds +'sec';
			document.getElementById(IDtype).innerHTML="directions_run";	// Due to time constraints, ride cannot be implemented
            var routeDate = new Date(pathDate[i]);
			document.getElementById(IDdate).innerHTML=routeDate;
			document.getElementById(IDcalories).innerHTML=calorieBurnt(totalDistance,Speed)	// Change 75 to the output of bodyindex
		
	
	
	}	
    if (arrayLength==0){
        alert('You have no saved runs. To save a run, click the + button on the page');
    }
}              


function setWeight(){
    do {
            var input = prompt('Please enter your weight in kilograms:')
            if (parseInt(input)) { 
                var weight = parseInt(input);
                localStorage.setItem('Assignment2Weight',weight);
                var done = 2;
            } else {
                var done = 1;
            }
        }
    while (done==1);
    clearCards();
    var pathID=[];
            var pathDate=[];
            var pathName=[];
            var pathDistance=[];
            var pathTime=[];
            var pathArray=[];
    for (i=0;i<allData.length;i++){
                pathID.push(allData[i].key);
                pathDate.push(allData[i].startTime);
                pathName.push(allData[i].name);
                pathDistance.push(allData[i].totalDistance);
                pathTime.push(allData[i].totalTime);
                pathArray.push(allData[i].paths);
            }
            pushCarddisp(pathID,pathDate,pathName,pathDistance,pathTime,pathArray);
}

// Calorie Counter
function calorieBurnt(distance,speed){
    if (localStorage.getItem('Assignment2Weight')){
        var weight = localStorage.getItem('Assignment2Weight');
    } else {
        do {
            var input = prompt('Please enter your weight in kilograms:')
            if (parseInt(input)) { 
                var weight = parseInt(input);
                localStorage.setItem('Assignment2Weight',weight);
                var done = 2;
            } else {
                var done = 1;
            }
        }
        while (done==1);
    }
            
//calorie ESTIMATION (Height not used)
var weightLbs=weight*2.20462262;
var  distanceMiles=distance*0.621371192;
if (distance<0.08) { var calories=0; }	// Rules out posibilities of 'burning calories' while sitting
else {
    if(speed>8){	// Run
    var calories=weightLbs*distanceMiles*0.75;}
    else {	// Walk
    var calories=weightLbs*distanceMiles*0.53;}
}


return	Math.ceil(calories)
}

//delete card from localStorage
//eneter routeID = 'all' to delete all runs

function routeDelete(routeID){
    if (routeID == 'all') {
        var isSure = confirm('Are you sure you want to delete all runs?');
        if (isSure){
            var storageArray = [];
            for (var i=0; i<localStorage.length;i++){
                if (localStorage.key(i).substr(0,15)=='Assignment2Path'){
                    storageArray.push(localStorage.key(i).substr(-2));
                }
            }
            for (i=0;i<storageArray.length;i++){
                localStorage.removeItem('Assignment2Path' + storageArray[i]);
                document.getElementById("homepage-card-whole-"+storageArray[i]).parentElement.removeChild(document.getElementById("homepage-card-whole-"+storageArray[i]));
            }
        }

    } else {
        if (routeID<10){
            localStorage.removeItem('Assignment2Path0' + routeID);
        }
        else{
            localStorage.removeItem('Assignment2Path' + routeID);
        }
        if (routeID<10){
            document.getElementById("homepage-card-whole-0"+routeID).parentElement.removeChild(document.getElementById("homepage-card-whole-0"+routeID));
        }
        else{
            document.getElementById("homepage-card-whole-"+routeID).parentElement.removeChild(document.getElementById("homepage-card-whole-"+routeID));
        }
        
    }
}

function clearCards(){
    var cardsNode = document.getElementById("homepage-card-whole");
    while (cardsNode.firstChild) {
        cardsNode.removeChild(cardsNode.firstChild);
    }
}

function sortDate(){
    clearCards();
    var storageArray = [];
            for (var i=0; i<localStorage.length;i++){
                if (localStorage.key(i).slice(0,15)=='Assignment2Path'){
                    storageArray.push(localStorage.key(i));
                }
            }
            storageArray.sort();
                
            var pathID=[];
            var pathDate=[];
            var pathName=[];
            var pathDistance=[];
            var pathTime=[];
            var pathArray=[];
                
    
                allData = [];
            for (i=0;i<storageArray.length;i++){
                var currentKey = storageArray[i];
                var currentData = JSON.parse(localStorage.getItem(currentKey))
                currentData.key = currentKey.slice(-2);
                allData.push(currentData);
            }
    
            allData.sort(function(a,b){
                  if (a.startTime < b.startTime)
                    return -1;
                  if (a.startTime > b.startTime)
                    return 1;
                  return 0;
                });
            
            for (i=0;i<allData.length;i++){
                pathID.push(allData[i].key);
                pathDate.push(allData[i].startTime);
                pathName.push(allData[i].name);
                pathDistance.push(allData[i].totalDistance);
                pathTime.push(allData[i].totalTime);
                pathArray.push(allData[i].paths);
            }
            pushCarddisp(pathID,pathDate,pathName,pathDistance,pathTime,pathArray);

}

function sortName(){
    clearCards();
    var storageArray = [];
            for (var i=0; i<localStorage.length;i++){
                if (localStorage.key(i).slice(0,15)=='Assignment2Path'){
                    storageArray.push(localStorage.key(i));
                }
            }
            storageArray.sort();
                
            var pathID=[];
            var pathDate=[];
            var pathName=[];
            var pathDistance=[];
            var pathTime=[];
            var pathArray=[];
                
    
                allData = [];
            for (i=0;i<storageArray.length;i++){
                var currentKey = storageArray[i];
                var currentData = JSON.parse(localStorage.getItem(currentKey))
                currentData.key = currentKey.slice(-2);
                allData.push(currentData);
            }
    
            allData.sort(function(a,b){
                  if (a.name < b.name)
                    return -1;
                  if (a.name > b.name)
                    return 1;
                  return 0;
            });
            
            for (i=0;i<allData.length;i++){
                pathID.push(allData[i].key);
                pathDate.push(allData[i].startTime);
                pathName.push(allData[i].name);
                pathDistance.push(allData[i].totalDistance);
                pathTime.push(allData[i].totalTime);
                pathArray.push(allData[i].paths);
            }
            pushCarddisp(pathID,pathDate,pathName,pathDistance,pathTime,pathArray);

}

function sortDistance(){
    clearCards();
    var storageArray = [];
            for (var i=0; i<localStorage.length;i++){
                if (localStorage.key(i).slice(0,15)=='Assignment2Path'){
                    storageArray.push(localStorage.key(i));
                }
            }
            storageArray.sort();
                
            var pathID=[];
            var pathDate=[];
            var pathName=[];
            var pathDistance=[];
            var pathTime=[];
            var pathArray=[];
                
    
                allData = [];
            for (i=0;i<storageArray.length;i++){
                var currentKey = storageArray[i];
                var currentData = JSON.parse(localStorage.getItem(currentKey))
                currentData.key = currentKey.slice(-2);
                allData.push(currentData);
            }
    
            allData.sort(function(a,b){
                var result = a.totalDistance - b.totalDistance;
                return result});
            
            for (i=0;i<allData.length;i++){
                pathID.push(allData[i].key);
                pathDate.push(allData[i].startTime);
                pathName.push(allData[i].name);
                pathDistance.push(allData[i].totalDistance);
                pathTime.push(allData[i].totalTime);
                pathArray.push(allData[i].paths);
            }
            pushCarddisp(pathID,pathDate,pathName,pathDistance,pathTime,pathArray);

}

function sortTime(){
    clearCards();
    var storageArray = [];
            for (var i=0; i<localStorage.length;i++){
                if (localStorage.key(i).slice(0,15)=='Assignment2Path'){
                    storageArray.push(localStorage.key(i));
                }
            }
            storageArray.sort();
                
            var pathID=[];
            var pathDate=[];
            var pathName=[];
            var pathDistance=[];
            var pathTime=[];
            var pathArray=[];
                
    
                allData = [];
            for (i=0;i<storageArray.length;i++){
                var currentKey = storageArray[i];
                var currentData = JSON.parse(localStorage.getItem(currentKey))
                currentData.key = currentKey.slice(-2);
                allData.push(currentData);
            }
    
            allData.sort(function(a,b){
                var result = a.totalTime - b.totalTime;
                return result});
            
            for (i=0;i<allData.length;i++){
                pathID.push(allData[i].key);
                pathDate.push(allData[i].startTime);
                pathName.push(allData[i].name);
                pathDistance.push(allData[i].totalDistance);
                pathTime.push(allData[i].totalTime);
                pathArray.push(allData[i].paths);
            }
            pushCarddisp(pathID,pathDate,pathName,pathDistance,pathTime,pathArray);

}


function sortSpeed(){
    clearCards();
    var storageArray = [];
            for (var i=0; i<localStorage.length;i++){
                if (localStorage.key(i).slice(0,15)=='Assignment2Path'){
                    storageArray.push(localStorage.key(i));
                }
            }
            storageArray.sort();
                
            var pathID=[];
            var pathDate=[];
            var pathName=[];
            var pathDistance=[];
            var pathTime=[];
            var pathArray=[];
                
    
                allData = [];
            for (i=0;i<storageArray.length;i++){
                var currentKey = storageArray[i];
                var currentData = JSON.parse(localStorage.getItem(currentKey))
                currentData.key = currentKey.slice(-2);
                allData.push(currentData);
            }
    
            allData.sort(function(a,b){
                var speedA = a.totalDistance / a.totalTime;
                var speedB = b.totalDistance / b.totalTime;
                return speedA - speedB});
            
            for (i=0;i<allData.length;i++){
                pathID.push(allData[i].key);
                pathDate.push(allData[i].startTime);
                pathName.push(allData[i].name);
                pathDistance.push(allData[i].totalDistance);
                pathTime.push(allData[i].totalTime);
                pathArray.push(allData[i].paths);
            }
            pushCarddisp(pathID,pathDate,pathName,pathDistance,pathTime,pathArray);

}

function reverseOrder(){
    clearCards();
    allData.reverse();
    var pathID=[];
            var pathDate=[];
            var pathName=[];
            var pathDistance=[];
            var pathTime=[];
            var pathArray=[];
    for (i=0;i<allData.length;i++){
                pathID.push(allData[i].key);
                pathDate.push(allData[i].startTime);
                pathName.push(allData[i].name);
                pathDistance.push(allData[i].totalDistance);
                pathTime.push(allData[i].totalTime);
                pathArray.push(allData[i].paths);
            }
            pushCarddisp(pathID,pathDate,pathName,pathDistance,pathTime,pathArray);
}
    

// sort


//	Independent from pushCarddisp, toggles map to hide or show	
function dispMap(i) {
    var IDtagouter="homepage-card-hat-map-"+i;
     if( document.getElementById(IDtagouter).classList.contains('map-hidden')) {

            // restrict to only one map at a time
            var mapStatus = document.getElementsByClassName('map-visible'),
                i = mapStatus.length;
            while (i--) {	// looping backwards
                mapStatus[i].className = 'map-hidden';
        }
            document.getElementById(IDtagouter).classList.add('map-visible');
            document.getElementById(IDtagouter).classList.remove('map-hidden');    }
    else {
    document.getElementById(IDtagouter).classList.remove('map-visible');
    document.getElementById(IDtagouter).classList.add('map-hidden');
}
}

//	Independent from pushCarddisp, Displays googleMap
// Description : Pushes out a map and a polyline(Path)
// Formal Parameters:	iteration		-	function initiated in the for loop hence will use the "i" values from the loop
//									pathArrayIn	-	the "inner" array of pathArray from previous function, will use this as the polyline points
function initialize(iteration,pathArrayIn) {
    var IDout= 'map'+iteration;
              var map = new google.maps.Map(document.getElementById(IDout), {
                zoom: 17,
                center:  pathArrayIn[0],	// Starting point of the pathArrayIn
                mapTypeId: google.maps.MapTypeId.TERRAIN
              });

              var pathCoordinates = pathArrayIn;
              var Path = new google.maps.Polyline({
                path: pathCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map: map
              });

            var startMarker = new google.maps.Marker({
                position: pathArrayIn[0],
                map: map,
                icon: {
                            url: '../app/images/startLarge.png',
                            size: new google.maps.Size(64,64),
                        }
            });

            var endMarker = new google.maps.Marker({
                position: pathArrayIn[pathArrayIn.length-1],
                map: map,
                icon: {
                            url: '../app/images/finishLarge.png',
                            size: new google.maps.Size(64,64),
                        }
            });

              Path.setMap(map);
}

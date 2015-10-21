var pathCurrent = {

    paths: [],
    startTime: null,
    addPosition: function(positionNew){
        this.paths.push({
            lat: positionNew.coords.latitude,
            lng: positionNew.coords.longitude
        });
        var R = 6371; // kilometres
        var lat1 = this.paths[this.paths.length-2].lat * Math.PI / 180;
        var lat2 = this.paths[this.paths.length-1].lat * Math.PI / 180;
        var latDif = (this.paths[this.paths.length-1].lat-this.paths[this.paths.length-2].lat) * Math.PI / 180;
        var lngDif = (this.paths[this.paths.length-1].lng-this.paths[this.paths.length-2].lng) * Math.PI / 180;

        var a = Math.sin(latDif/2) * Math.sin(latDif/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(lngDif/2) * Math.sin(lngDif/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        var d = R * c;
        this.totalDistance += d;
    },
    totalDistance: 0
};

navigator.geolocation.watchPosition(updatePosition);

function updatePosition(positionNew){
    var googlePosition = {lat: positionNew.coords.latitude, lng: positionNew.coords.longitude};
    markerPosition.setPosition(googlePosition);
    map.setCenter(googlePosition);
    console.log(positionNew);
    document.getElementById('locationData').innerHTML = 'Lat: ' + positionNew.coords.latitude.toFixed(5) + '<br>Long: ' + positionNew.coords.longitude.toFixed(5);  
    var acc=positionNew.coords.accuracy.toFixed(2)
    
    if(acc<10){
        document.getElementById('locationAccuracy').innerHTML = 'Accuracy: High';}
    else if(acc<30){
        document.getElementById('locationAccuracy').innerHTML = 'Accuracy: Med';}
    else{
        document.getElementById('locationAccuracy').innerHTML = 'Accuracy: Low';
        googlePosition.lat = NaN; 
        googlePosition.lng = NaN;
    }
}

function record(positionNew){
    pathCurrent.addPosition(positionNew);
    var myLatlng = new google.maps.LatLng(positionNew.coords.latitude, positionNew.coords.longitude);
    if (markerStart.getPosition() == null) { markerStart.setPosition(myLatlng); }
    var Mypath = polyPath.getPath();
    Mypath.push(myLatlng);
    var disString = Number(pathCurrent.totalDistance);
    document.getElementById('distance').innerHTML = disString.toFixed(2) + 'km';
}

function pathHeading(position1,position2){
    
    var lat1 = position1.lat;
    var lat2 = position2.lat;
    var lon1 = position1.lng;
    var lon2 = position2.lng;

    var angle = (Math.atan2(Math.sin((lon2-lon1)*Math.PI/180)*Math.cos(lat2*Math.PI/180),Math.cos(lat1*Math.PI/180)*Math.sin(lat2*Math.PI/180)-Math.sin(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.cos((lon2-lon1)*Math.PI/180))*180/Math.PI);

    if (angle < 0){
        var heading = 360+angle;
    } else{
        var heading = angle;
    }
    
    return heading;
}

function pathCompress(){
    var pathBeforeCompression = [];
    var numDel=0;
    do {
        pathBeforeCompression = pathCurrent.paths;
        for (i=0;i<pathCurrent.paths.length-2;i++){
            var headingDifference = pathHeading(pathCurrent.paths[i], pathCurrent.paths[i+1]) - pathHeading(pathCurrent.paths[i],pathCurrent.paths[i+2]);
            if (Math.abs(headingDifference) < 10){ pathCurrent.paths.splice(i+1,1); numDel++; }
        
        }
    }
    while (pathBeforeCompression != pathCurrent.paths)
        alert('Deleted ' + numDel + ' colinear points from the path');
}

function buttonClick(){
    if (recordOn) {
        console.log('Stop recording path');
        var nowdate = new Date();
        pathCurrent.totalTime = nowdate.getTime() - pathCurrent.startTime.getTime();pathCurrent.endTime = new Date();
        clearInterval(timeUpdateID);
        recordOn = false;
        navigator.geolocation.clearWatch(idRecord);
        markerPosition.setAnimation(null);
        var save = confirm('Would you like to save the route?');
        if (save){
            var name = prompt('Please enter a name for the route');
            pathCurrent.name = name;
            pathCompress();
            var saveString = JSON.stringify(pathCurrent);
            var storageArray = [];
            for (var i=0; i<localStorage.length;i++){
                if (localStorage.key(i).substr(0,15)=='Assignment2Path'){
                    storageArray.push(localStorage.key(i));
                }
            }
            storageArray.sort();
            for (var i=0; i<storageArray.length;i++){
                if (storageArray[i].substr(15) != i) {
                    var storageID = i;
                    break;
                }
            }
            var storageID;
            if (!storageID){ storageID = storageArray.length; }
            if (storageID<10) { storageID = '0'+storageID; }
            localStorage.setItem('Assignment2Path'+storageID, saveString);
        }
        document.getElementById('infoTable').style.display = 'none';
        var myPoly = polyPath.getPath();
        myPoly.clear();
        pathCurrent.paths = [];
        pathCurrent.startTime = null;
        pathCurrent.totalDistance = 0;
        document.getElementById('time').innerHTML = '0:0';
        document.getElementById('distance').innerHTML = '0.00km';
        document.getElementById('button').style.width = "100%";
        document.getElementById('button').innerHTML = "Start Recording";    
        markerStart.setPosition(null);
    }
    else {
        console.log('Start recording path');
        pathCurrent.startTime = new Date();
        idRecord = navigator.geolocation.watchPosition(record);
        recordOn = true;
        markerPosition.setAnimation(google.maps.Animation.BOUNCE);
        document.getElementById('button').style.width = '55%';
        document.getElementById('button').style.position='absolute';
        document.getElementById('button').style.right = '0vh';
        document.getElementById('button').style.bottom= '0vh';
        document.getElementById('infoTable').style.display = 'table';
        document.getElementById('infoTable').style.width = '45.5%';
        document.getElementById('infoTable').style.position='absolute';
        document.getElementById('infoTable').style.left = '0vh';
        document.getElementById('button').innerHTML = 'Stop Recording';
        timeUpdateID = setInterval(function(){var nowdate = new Date(); document.getElementById('time').innerHTML = convertTime(nowdate.getTime() - pathCurrent.startTime.getTime());}, 1000);
    }
}
        
function convertTime(ms){ 
    var total_t_s = ms / 1000; //Convert milliseonds to seconds
    var final_t_m = Math.floor(total_t_s / 60); //Convert seconds to minutes
    var final_t_s = total_t_s - (final_t_m * 60); //Calculates seconds
    var timeString = final_t_m + ':' + Math.round(final_t_s);
    return timeString
}
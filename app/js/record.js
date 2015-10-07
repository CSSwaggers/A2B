<<<<<<< HEAD
var placement;
var recordOn = false;
var recordWatchId;
var pathCurrent = {
    paths: [],
    positionAdd: function(positionNew){ pathCurrent.paths[pathCurrent.paths.length] = {
        lat: positionNew.coords.latitude,
        lng: positionNew.coords.longitude,
        time: positionNew.timestamp
    }}
};
var polylineCurrent = new google.maps.Polygon({
    map: map,
    paths: [],
    strokeColor: '#FF0000',
    strokeOpacity: 1,
    zIndex: 100
});
    
navigator.geolocation.watchPosition(markerUpdatePosition);

function markerUpdatePosition(positionNew){
    if (markerPosition){
        console.log(positionNew);
        var googlePosition = {lat: positionNew.coords.latitude, lng: positionNew.coords.longitude};
        markerPosition.position = googlePosition;
    }
}

function recordStartStop(){
    if (recordOn == false){
        recordWatchId = navigator.geolocation.watchPosition(recordUpdatePosition);
        markerPosition.setAnimation(google.maps.Animation.BOUNCE);
        recordOn = true;
    }
    else {
        //navigator.geolocation.clearWatch(recordWatchId);
        console.log('turn off watchPosition');
        recordOn = false;
    }
}

function recordUpdatePosition(positionNew){
    console.log('logging new pos');
    pathCurrent.positionAdd(positionNew);
    polylinePathNew = polylineCurrent.getPath();
    if (polylinePathNew){
        polylinePathNew[polylinePathNew.length] = {lat: positionNew.coords.latitude, lng: positionNew.coords.longitude}
        console.log('Plotting next point as'+polylinePathNew[polylinePathNew.length-1]);
    };
    if (!polylinePathNew){
                polylinePathNew = [{lat: positionNew.coords.latitude, lng: positionNew.coords.longitude}];
        console.log('Plotting first point as '+polylinePathNew[polylinePathNew.length-1].lat);
    };
    polylineCurrent.setPath(polylinePathNew);
    //updateCurrentInfo(positionNew);
}
//
////currentPath is an object as such:
////    
////    {
////    title: “The Route Name”,
////    paths: [{
////        lat: value,
////        lng: value,
////        time: value
////    }, {
////        lat: value,
////        lng: value,
////        time: value
////    }, {
////        etc, etc
////    }]
////    }
=======
var pathCurrent = {
    
    paths: [],
    addPosition: function(positionNew){
        this.paths.push({
            lat: positionNew.coords.latitude,
            lng: positionNew.coords.longitude,
            time: positionNew.timestamp
        });
    },
    timeTotal: function(){
        var timestamptime = this.paths[this.paths.length-1].time - this.paths[0].time;
        var stringtime = new Date(timestamptime);
        return stringtime.getTime()
    },
    distanceTotal: function(){
        var R = 6371000; // metres
        var lat1 = this.paths[0].lat * Math.PI / 180;
        var lat2 = this.paths[this.paths.length-1].lat * Math.PI / 180;
        var latDif = (this.paths[this.paths.length-1].lat-this.paths[0].lat) * Math.PI / 180;
        var lngDif = (this.paths[this.paths.length-1].lng-this.paths[0].lng) * Math.PI / 180;

        var a = Math.sin(latDif/2) * Math.sin(latDif/2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(lngDif/2) * Math.sin(lngDif/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = R * c;
        return d
    }
};
navigator.geolocation.watchPosition(updatePosition);

function updatePosition(positionNew){
    var googlePosition = {lat: positionNew.coords.latitude, lng: positionNew.coords.longitude};
    markerPosition.setPosition(googlePosition);
    map.setCenter(googlePosition);
} 
        
function record(positionNew){
    pathCurrent.addPosition(positionNew);
    var myLatlng = new google.maps.LatLng(positionNew.coords.latitude, positionNew.coords.longitude);
    var Mypath = polyPath.getPath();
    console.log(myLatlng);
    console.log(polyPath);
    Mypath.push(myLatlng);
    markerPosition.setTitle('Distance: ' + String(pathCurrent.distanceTotal()) + '</br>Time: ' + String(pathCurrent.timeTotal()));
}
        
function addToCurrentPathObject(positionNew) {
    var placementNew = document.getElementById('geolocation');
    placementNew.innerHTML = {
        latitude:   positionNew.coords.latitude,
        longitude:  positionNew.coords.longitude,
        timestamp:  new Date(positionNew.timestamp)
    }
    currentPath.paths[currentPath.paths.length] = placementNew;
}   
>>>>>>> master

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
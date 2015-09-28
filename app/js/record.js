
navigator.geolocation.watchPosition(updatePosition);

function updatePosition(positionNew){
    if (markerPosition){
        console.log(positionNew);
        var googlePosition = {lat: positionNew.coords.latitude, lng: positionNew.coords.longitude};
        markerPosition.position = googlePosition;
        
            
    }
}
    
//    if (recordOn == true){
//                addLocationToCurrentPathObject(positionNew);
//                addLocationToCurrentMapsPolyLine(positionNew);
//                updateCurrentInfo(positionNew);
//    }
    
//function addLocationToCurrentPathObject(positionNew){
//    var placementNew = {
//        lat: positionNew.coords.latitude,
//        lng: positionNew.coords.longitude,
//        time: positionNew.timesamp
//    }
//    currentPath.paths[currentPath..paths.length] = placementNew;
//}
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
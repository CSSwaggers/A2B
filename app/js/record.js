navigator.geolocation.watchPosition(updatePosition);

function updatePosition(positionNew){
    if (markerPosition){
        console.log(positionNew);
        var googlePosition = {lat: positionNew.coords.latitude, 
                              lng: positionNew.coords.longitude};
        markerPosition.position = googlePosition;
        
            
    }
}

    if (recordOn == true){
                addToPathObject(positionNew);
                addToCurrentMapsPolyLine(positionNew);
                updateCurrentInfo(positionNew);
    }

/*
function addToCurrentPathObject(positionNew){
    var placementNew = {
        lat: positionNew.coords.latitude,
        lng: positionNew.coords.longitude,
        time: positionNew.timesamp
    }
    currentPath.paths[currentPath..paths.length] = placementNew;
}
*/
    function addToCurrentPathObject(positionNew) {
        var placementNew = document.getElementById('geolocation');
        placementNew.innerHTML = {
            latitude:   positionNew.coords.latitude,
            longitude:  positionNew.coords.longitude,
            timestamp:  new Date(positionNew.timestamp)
        }
        currentPath.paths[currentPath.paths.length] = placementNew;
    }    
/*



////currentPath is an object as such:
  /*  
    {
    route_name: '',
    paths: [{
        lat: value,
        lng: value,
        time: value
    }, {
        lat: value,
        lng: value,
        time: value
    }, {
        etc, etc
    }]
    }
*/



/*
//Calculate distance travelled
function gps_distance(lat1, lon1, lat2, lon2)
{
  // http://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371; // km
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var lat1 = lat1 * (Math.PI / 180);
    var lat2 = lat2 * (Math.PI / 180);
 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
     
    return d;
}
*/



/*
// Calculate duration 
start_time = new Date(data[0].timestamp).getTime();
end_time = new Date(data[data.length-1].timestamp).getTime();
 
total_time_ms = end_time - start_time;
total_time_s = total_time_ms / 1000;
 
final_time_m = Math.floor(total_time_s / 1000);
final_time_s = total_time_s - (final_time_m * 60);
 
// Display total distance and time
$("#track_info_info").html('Travelled <strong>' + total_km_rounded + '</strong> km in <strong>' + final_time_m + 'm</strong> and <strong>' + final_time_s + 's</strong>');
*/



/*
// Plotting the route
// Set the initial Lat and Long of the Google Map
var myLatLng = new google.maps.LatLng(data[0].coords.latitude, data[0].coords.longitude);
 
// Google Map options
var myOptions = {
  zoom: 15,
  center: myLatLng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
 
// Create the Google Map, set options
var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

var trackCoords = [];
 
// Add each GPS entry to an array
for(i=0; i<data.length; i++){
    trackCoords.push(new google.maps.LatLng(data[i].coords.latitude, data[i].coords.longitude));
}
 
// Plot the GPS entries as a line on the Google Map
var trackPath = new google.maps.Polyline({
  path: trackCoords,
  strokeColor: "#FF0000",
  strokeOpacity: 1.0,
  strokeWeight: 2
});
 
// Apply the line to the map
trackPath.setMap(map);
*/
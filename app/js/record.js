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
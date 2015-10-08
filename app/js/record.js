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


/* 
//Buttons
  <div data-role="content"> //OPTIONAL: text field for user to enter name for their workout 
    <p id="startTracking_status"></p>
      <div data-role="fieldcontain" class="ui-hide-label">
        <label for="track_id">Track ID/Name:</label>
        <input type="text" name="track_id" id="track_id" placeholder="Workout ID/Name"/>
      </div>
 
    <button data-role="button" id="startTracking_start">Start Tracking</button>
    <button data-role="button" id="startTracking_stop">Stop Tracking</button>  

        <p id="startTracking_debug"></p>
         
  </div> 
  
  //Tracking/recording movement
  var track_id = '';      // Name/ID of the exercise
  var watch_id = null;    // ID of the geolocation
  var tracking_data = []; // Array containing GPS position objects
  var final_data = []; // Array for storing the data at end of tracking
    $("#startTracking_start").live('click', function(){

        // Start tracking the User
        watch_id = navigator.geolocation.watchPosition(    //polls GPS feature of the phone and recieves constant updates on location

            // Success                                     //if successful, pass the currentPath object
            function(currentPath){
                tracking_data.push(currentPath);
            },

            // Error
            function(error){
                console.log(Unable to track run!);
            },

            // Settings
            { frequency: 3000, enableHighAccuracy: true });

        // OPTIONAL: Tidy up the UI
        track_id = $("#track_id").val();

        $("#track_id").hide();

        $("#startTracking_status").html("Tracking workout: <strong>" + track_id + "</strong>");
    });
    
    function stopRecordingRoute(){
        final_data = tracking_data; //(stores array into new array)
        geolocation.clearWatch(updatePosition); //clears the id "updatePosition" set by the geolocation.watchPosition at start
        recornOn = false // necessary?
        
    }

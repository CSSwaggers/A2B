
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
  */
  

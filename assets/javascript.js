

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6mZbWdxhmLw4fuxedbn_3P5z4k-IuSV0",
    authDomain: "neighborhood-watch-4cada.firebaseapp.com",
    databaseURL: "https://neighborhood-watch-4cada.firebaseio.com",
    projectId: "neighborhood-watch-4cada",
    storageBucket: "neighborhood-watch-4cada.appspot.com",
    messagingSenderId: "674484382230"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  var userName;
  var zipCode;
  var markerArray = [];
  var oldMarkers= [];
  var map;
  var infoWindow;
 




database.ref('/Markers').on("value", function(snapshot) {
  
  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  snapshot.forEach(function(childSnapshot){
    let childData = childSnapshot.val();
    console.log(childData);
    markerArray.push(childData);
  });
     // adding all of our Markers to the map 

      reloadMarkers();
  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


function reloadMarkers(){
  for (let h = 0; h < oldMarkers.length; h++){
    oldMarkers[h].setMap(null);
    }
  oldMarkers = [];
  for(let i = 0; i < markerArray.length ; i++){  
    addMarker(markerArray[i])
    }
};
  
function initMap(){
    // map options
     var options ={
      center: {lat: 39.0997, lng: -94.5786},
      zoom: 14,
      // Give the map a night style
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
     }
     markerArray = [
      {Markers:{
        coords: {lat:39.0995, lng: -94.5780},
        // iconImage:'images/005-exit.png',
        content:'<h3>Activity1<h3>'
      }},
      { Markers:{
        coords: {lat:39.1000, lng: -94.5782},
        // iconImage:'images/011-group.png',
        content:'<h3>Criminal Activity2<h3>'
      }},
      {Markers:{
      coords: {lat:39.0998, lng: -94.5784},
      // iconImage:"",
      content:'<h3>Suspicious Activity3<h3>'
      }},
    ];
    //  New map
     map = new 
     google.maps.Map(document.getElementById('googleMap'), options);

     var geocoder = new google.maps.Geocoder();
   

    // listen for click on map
    google.maps.event.addListener(map, 'click', 
    function(event){
      // geocoding the map click to return its zip code
      geocoder.geocode({
        'latLng': event.latLng
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            console.log(results);
            let zipCode = results[0].address_components[7].short_name;
            console.log(zipCode);
          }
        }
      });
      console.log(zipCode);
      // Getting the data to add our marker to the database
      var userMarkerMessage = prompt("Leave a message with your marker here", "Fun party here!")
      let lat = event.latLng.lat();
      let lng = event.latLng.lng();
      let coords = {lat:lat , lng: lng};
      let newMarker = {coords: coords,
        content: userMarkerMessage};
        // adding markers to the database
      database.ref("/Markers").push({Markers: newMarker});  
    })
  
    // adding all of our Markers to the map 
    for(let i = 0; i < markerArray.length ; i++){
      addMarker(markerArray[i])
       };
}

 // function that adds markers given coordinates, and iconImage
function addMarker(props){
  var marker = new google.maps.Marker({
     position: props.Markers.coords,
     map: map,
     draggable: true,
     animation: google.maps.Animation.DROP,
    //  icon: props.iconImage
   });
   // Checking for a custom icon
   if(props.Markers.iconImage){
     // Setting icon image
     marker.setIcon(props.Markers.iconImage);
   }
   // Check if there is additional content
   if(props.Markers.content){
     var infoWindow = new google.maps.InfoWindow({
       content: props.Markers.content
     });
     marker.addListener('click', function(){
      infoWindow.open(map, marker);
   })
  }
  oldMarkers.push(marker);
};



// var form = document.getElementById('geo');
// form.addEventListener('submit', geocoder);
$("#geocodeButton").on('click', geocoding());

function geocoding() {
//   prevent actual submit
//   event.preventDefault();
    //let location = "1111 Main st Kansas City MO"
  let location = $("input").val().trim();

  console.log("Our geo search" + location)
  if (location === ""){
    alert("didnt work");
    return}
  console.log("Our geo search" + location);
   axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
     params: {
       address: location, 
       key:'AIzaSyCV5fLzBC8q8GbS163UxAiHAZlcEHenxvI'
     }
   })
   .then(function(response){
     console.log(response);
     // Using our location data
     zipCode = response.data.results[0].address_components[7].short_name
     let lat = response.data.results[0].geometry.location.lat;
     let lng = response.data.results[0].geometry.location.lng;
     let coords = {lat: lat, lng: lng};
     console.log(coords);
     
     map.setCenter(coords);
   })
   .catch(function(error){
     console.log(error);
   });
};





initMap();


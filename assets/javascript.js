{/* <script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCV5fLzBC8q8GbS163UxAiHAZlcEHenxvI&callback=initMap"></script>
</script> */}


// Example data set retrieved from below ajax call
// 0:
// address: "3400  NORTON AV"
// area: "EPD"
// beat: "332"
// city: "KANSAS CITY"
// description: "Burglary - Residence"
// dvflag: "U"
// firearm_used_flag: "N"
// from_date: "2018-09-02T00:00:00.000"
// from_time: "18:15"
// ibrs: "220"
// invl_no: "1"
// involvement: "VIC"
// location_address: "3400 NORTON AV"
// location_city: "KANSAS CITY"
// location_zip: "64130"
// offense: "501"
// race: "U"
// rep_dist: "PJ2783"
// report_no: "180067842"
// reported_date: "2018-09-02T00:00:00.000"
// reported_time: "18:15"
// sex: "U"
// zip_code: "64130"

$.ajax({
    url: "https://data.kcmo.org/resource/nyg5-tzkz.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "j18RbeHRsp7j7iHr4KIskwzWP"
    }
  }).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
  });
  
  
  
  
  
  
  var markerArray = [
    {
      coords: {lat:39.0995, lng: -94.5780},
      // iconImage:'',
      content:'<h1>Criminal Activity1<h1>'
    },
    {
      coords: {lat:39.1000, lng: -94.5782},
      // iconImage:'',
      content:'<h1>Criminal Activity2<h1>'
    },
    {
    coords: {lat:39.0998, lng: -94.5784},
    // iconImage:"",
    content:'<h1>Criminal Activity3<h1>'
    },
  ];
  var map;
  
  
  function initMap() {
    // map options
     var options ={
      center: {lat: 39.0997, lng: -94.5786},
      zoom: 10,
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
     
    //  New map
     map = new 
     google.maps.Map(document.getElementById('map'), options);
  
     var infoWindow = new google.maps.InfoWindow({
      content:"<h1>Kansas City<h1>"
     })
  
     // function that adds markers given coordinates, and iconImage
  function addMarker(props){
    var marker = new google.maps.Marker({
       position: props.coords,
       map: map,
      //  icon: props.iconImage
     });
     // Checking for a custom icon
     if(props.iconImage){
       // Setting icon image
       marker.setIcon(props.iconImage);
     }
     // Check if there is additional content
     if(props.content){
       var infoWindow = new google.maps.InfoWindow({
         content: props.content
       });
       marker.addListener('click', function(){
        infoWindow.open(map, marker);
     })
    }
  }
    // adding all of or Markers to the map 
    for(let i = 0; i < markerArray.length; i++){
      addMarker(markerArray[i])
       };
  }
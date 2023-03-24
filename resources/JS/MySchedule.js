
        // displays the big picture on mouseover of the 1st 
        // paragraph element "A paragraph with a picture" in the body below
          function showBigPic(num) {
              bigpic = document.getElementById("big");
              if (parseInt(num) == 1) {
                bigpic.src = "images/MondayNightfb.jpg";
                bigpic.alt = "Monday Night football";
              }
              else if (parseInt(num) == 2) {
                bigpic.src = "images/FolwellHall.jfif";
                bigpic.alt = "Spanish";
              }
              else if (parseInt(num) == 3) {
                bigpic.src = "images/BlazePizza.jpg";
                bigpic.alt = "Blaze Pizza";
              }
              else if (parseInt(num) == 4) {
                bigpic.src = "images/RecWell.jpg";
                bigpic.alt = "RecWell";
              }
              else if (parseInt(num) == 5) {
                bigpic.src = "images/Wahu.jpg";
                bigpic.alt = "Wahu";
              }
              else if (parseInt(num) == 6) {
                bigpic.src = "images/Caribou.jpg";
                bigpic.alt = "Caribou Coffee";
              }
              else if (parseInt(num) == 7) {
                bigpic.src = "images/HellsKitchen.jpg";
                bigpic.alt = "Hells Kitchen";
              }
              else if (parseInt(num) == 8) {
                bigpic.src = "images/LifetimeFitness.jpg";
                bigpic.alt = "Life Time";
              }
          }    



          // transition for images with button 



        function changeImage(event){
            var myimg = document.getElementById("big");
            var btn = document.getElementById('logoButton');
            myimg.classList.toggle('fade');
            if (btn.innerText == "Hide"){
                btn.innerText = "Show";
            }
            else{
                btn.innerText = "Hide";
            }
        }



        //   stuff for map 

        var map;
        var directionsService;
        var directionsRenderer;
        var currentLocation;
        var userLocation;

        function initMap() {

            // instantiating map

            var myLatLng = {lat: 44.977276, lng: -93.232266};

            map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 14
            });


            // Create an object to store the markers by latitude/longitude


            var geocoder = new google.maps.Geocoder(); // Create a geocoder object

            var table = document.getElementById('schedule-table');

            for(var i = 1; i < 7; i++){

                var cells = table.rows.item(i).cells;

                const day = cells.item(0).innerHTML;
                const name = cells.item(1).innerHTML;
                const time = cells.item(2).innerHTML;
                const address = cells.item(3).innerText;


                // getting address using geocode

                geocoder.geocode({ 'address': address }, function(results, status) {
                    if (status == 'OK') {
                        var location = results[0].geometry.location;
                        var latitude = location.lat();
                        var longitude = location.lng();
                        createMarker(day, name, time, address, map, latitude, longitude);
                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                    }
                    });

            }


            // getting users location

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                });
            } 


        }


        function createMarker(day, eventName, time, address, map, latitude, longitude) {

            var icon = {
                url: "./images/Goldy.png"
                };
            icon.scaledSize = new google.maps.Size(35, 35);

            var marker = new google.maps.Marker({
                    position: {lat: latitude, lng: longitude},
                    map: map,
                    title: eventName,
                    icon: icon
                    });


            // creating an info window for the marker

            var myContent = eventName + "<br>" + day + " " + time + "<br>" + address;

            var myInfowindow = new google.maps.InfoWindow({
                    content: myContent
                    });

                    marker.addListener('click', function() {
                        myInfowindow.open(map, marker);
                    });
        }



        function calculateRoute() {

            // var geocoder = new google.maps.Geocoder();

  
            console.log(userLocation);


            var mode = document.querySelector('input[name="mode"]:checked').value;
            var destination = document.getElementById('destination').value;

            // calculating address 

  
             var actualAddress;

            var directionsService = new google.maps.DirectionsService();
            var directionsRenderer = new google.maps.DirectionsRenderer({map: map});

            directionsService.route({
                origin: userLocation,
                destination: destination,
                travelMode: mode
            }, function(response, status) {
                if (status === 'OK') {
                directionsRenderer.setDirections(response);
                } else {
                // Handle error
                }
            });
            
        }


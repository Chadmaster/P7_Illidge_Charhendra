let restaurants = [];

/* Function that gets restaurants from the json file*/
function getRestaurants() {
    let restaurants = [];
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'JSON',
        url: 'restaurants.json',
        success: function (response) {
            restaurants = response
        }
    });
    return restaurants;
}
restaurants = getRestaurants();

function initMap() {
    /* Initiating map*/
    let options = {
        zoom: 8,
        center: { lat: 48.8566, lng: 2.3522 }
    }
    let map = new google.maps.Map(document.getElementById('map'), options);

    /* Function used to add markers */
    function addMarker(coords) {
        let marker = new google.maps.Marker({
            position: coords,
            map: map,
            // icon: '', // add a link for icon 
        });
    }

    /* Add markers based on json file */
    restaurants.map(function (restaurant, index) {
        addMarker(
            {
                lat: restaurant.lat,
                lng: restaurant.long
            }
        );

    });

}

/* Add to list of restaurants side panel */













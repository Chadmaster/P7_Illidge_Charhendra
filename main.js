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
    center: {
      lat: 48.8566,
      lng: 2.3522
    }
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
    addMarker({
      lat: restaurant.lat,
      lng: restaurant.long
    });

  });

}


/* Function used to add restaurant > names, ratings, address and photos */
function addRestaurantInfo() {

  let restaurantsDiv = document.getElementById('restaurants');

  restaurantsDiv.innerHTML = "";

  console.table(restaurants);

  for (let r = 0; r < restaurants.length; r++) {

    let resto = document.createElement('div');
    let imgContainer = document.createElement('div');
    let img = document.createElement('img');
    let textContainer = document.createElement('div');
    let name = document.createElement('h5');
    let address = document.createElement('p');
    let ratings = document.createElement('p');

    resto.appendChild(imgContainer);
    resto.appendChild(textContainer);
    textContainer.appendChild(name);
    textContainer.appendChild(ratings);
    textContainer.appendChild(address);
    imgContainer.appendChild(img);

    imgContainer.classList.add('imgStyle');
    textContainer.classList.add('addressStyle');
    resto.classList.add('resto');

    let averageRating = moyen(restaurants[r]);
    ratings.innerHTML = averageRating;
    getStarRatingHtml(averageRating, ratings);
    ratings.innerHTML += ` (${restaurants[r].ratings.length})`;

    name.innerHTML = restaurants[r].restaurantName;
    address.innerHTML = restaurants[r].address;
    img.src = restaurants[r].image;


    restaurantsDiv.appendChild(resto);
  }

}
addRestaurantInfo();

/*Function used to get the moyen of the ratings */
function moyen(restaurant) {
  let totalStars = 0;
  for (let m = 0; m < restaurant.ratings.length; m++) {
    totalStars += restaurant.ratings[m].stars;
  }

  return totalStars / restaurant.ratings.length;
}

function getStarRatingHtml(averageRating, ratings) {
  const maxStars = 5;
  let qtyFullStars = parseInt(averageRating);
  let hasHalfStars = averageRating % 1 !== 0;
  let qtyEmptyStars = parseInt(maxStars - averageRating);

  if (qtyFullStars > 0) {
    for (let f = 0; f < qtyFullStars; f++) {
      let fullStar = document.createElement('i');

      fullStar.classList.add('fas');
      fullStar.classList.add('fa-star');

      ratings.appendChild(fullStar);
    }
  }

  if (hasHalfStars) {

    let halfStar = document.createElement('i');

    halfStar.classList.add('fas');
    halfStar.classList.add('fa-star-half-alt');

    ratings.appendChild(halfStar);

  }

  if (qtyEmptyStars > 0) {
    for (let e = 0; e < qtyEmptyStars; e++) {
      let emptyStar = document.createElement('i');

      emptyStar.classList.add('far');
      emptyStar.classList.add('fa-star');

      ratings.appendChild(emptyStar);
    }
  }
}

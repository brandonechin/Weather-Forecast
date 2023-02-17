var $weatherForm = document.querySelector('#weather-form');
$weatherForm.addEventListener('submit', searchCity);
var $cityBackground = document.querySelector('.city-background');
function searchCity(event) {
  event.preventDefault();
  $loader.className = 'loader-wrapper';
  $cityBackground.className = 'white-text city-font';
  var inputCity = {
    cityName: document.querySelector('#city-input').value,
    entryId: data.nextEntryId
  };

  data.nextEntryId += 1;
  data.cities.unshift(inputCity);
  viewSwap('city-page');
  $weatherForm.reset();
}

document.addEventListener('DOMContentLoaded', createInitialView);
function createInitialView(event) {
  viewSwap('search-page');
}

$weatherForm.addEventListener('submit', getCityInfo);
function getCityInfo(event) {
  var cityInfoLatLon = 'https://api.openweathermap.org/geo/1.0/direct?q=' + data.cities[0].cityName + '&appid=590354b7597fbc0d3a66d188da5ee2a9';
  var xhrCity = new XMLHttpRequest();
  xhrCity.open('GET', cityInfoLatLon);
  xhrCity.responseType = 'json';
  xhrCity.addEventListener('load', function () {
    data.cityInfo = xhrCity.response;
    getForecastInfo();
  });
  xhrCity.send();
}

var $cityName = document.querySelector('.city-name');
var $icon = document.querySelector('.open-weather-icon');
var $temperature = document.querySelector('.temperature');
var $highTemp = document.querySelector('.high-temp');
var $lowTemp = document.querySelector('.low-temp');
var $condition = document.querySelector('.condition');
var $feelsLike = document.querySelector('.feels-like');
var $humidity = document.querySelector('.humidity');
var $windSpeed = document.querySelector('.wind');
var $visibility = document.querySelector('.visibility');
var $likeIcon = document.querySelector('.like-icon');
var $feelsLikeText = document.querySelector('.feels-like-text');
var $humidityText = document.querySelector('.humidity-text');
var $windText = document.querySelector('.wind-text');
var $visibilityText = document.querySelector('.visibility-text');
var $faHeart = document.querySelector('#fa-heart');
var $loader = document.querySelector('.loader-wrapper');

window.addEventListener('load', function () {
  $loader.className = 'loader-wrapper hidden';
});

function getForecastInfo(event) {
  var cityForecast = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.cityInfo[0].lat.toString() + '&lon=' + data.cityInfo[0].lon.toString() + '&units=imperial&appid=590354b7597fbc0d3a66d188da5ee2a9';
  var xhrForecast = new XMLHttpRequest();
  xhrForecast.open('GET', cityForecast);
  xhrForecast.responseType = 'json';
  xhrForecast.addEventListener('load', function () {
    $cityName.textContent = this.response.name;
    $icon.src = 'https://openweathermap.org/img/wn/' + this.response.weather[0].icon + '@2x.png';
    $temperature.textContent = Math.round(this.response.main.temp) + '°F';
    $highTemp.textContent = Math.round(this.response.main.temp_max) + '°';
    $lowTemp.textContent = Math.round(this.response.main.temp_min) + '°';
    $condition.textContent = this.response.weather[0].description;
    $feelsLike.textContent = this.response.main.feels_like + '°';
    $feelsLikeText.textContent = 'Feels Like';
    $humidity.textContent = this.response.main.humidity + '%';
    $humidityText.textContent = 'Humidity';
    $windSpeed.textContent = this.response.wind.speed + 'mph';
    $windText.textContent = 'Wind Speed';
    $visibility.textContent = this.response.visibility + 'km';
    $visibilityText.textContent = 'Visibility';
    $faHeart.className = 'fa-solid fa-heart';
    $loader.className = 'loader-wrapper hidden';
    $cityBackground.className = 'white-text city-font city-background';

  });
  xhrForecast.send();
}

var $searchPage = document.querySelector('#search-page');
var $cityPage = document.querySelector('#city-page');
var $favoritePage = document.querySelector('#favorite-page');
var $logoHeader = document.querySelector('#logo-header');
var $newSearchButton = document.querySelector('#new-search-button');
var $mainContainer = document.querySelector('.main-container');
function viewSwap(viewtype) {
  data.view = viewtype;
  if (viewtype === 'search-page') {
    $searchPage.className = '';
    $cityPage.className = 'hidden';
    $favoritePage.className = 'hidden';
    $logoHeader.className = 'hidden';
    $newSearchButton.className = 'hidden';
    $mainContainer.className = 'container';
    $noFavorites.className = 'hidden';
  }
  if (viewtype === 'city-page') {
    $cityPage.className = '';
    $searchPage.className = 'hidden';
    $favoritePage.className = 'hidden';
    $newSearchButton.className = 'nav-anchors';
    $logoHeader.className = '';
    $mainContainer.className = 'container';
  }
  if (viewtype === 'favorite-page') {
    $favoritePage.className = '';
    $searchPage.className = 'hidden';
    $cityPage.className = 'hidden';
    $newSearchButton.className = 'nav-anchors';
    $logoHeader.className = '';
    $mainContainer.className = 'favorite-page-container';

  }
}

$newSearchButton.addEventListener('click', NewSearchButton);
function NewSearchButton(event) {
  if (event.target.matches('#new-search-button')) {
    viewSwap('search-page');
  }
}

var $noFavorites = document.querySelector('#no-favorites');
var $favoritesButton = document.querySelector('#favorites-button');
$favoritesButton.addEventListener('click', favoritesPage);
function favoritesPage(event) {
  if (event.target.matches('#favorites-button')) {
    viewSwap('favorite-page');
    if (data.favorites.length > 0) {
      $loader.className = 'loader-wrapper';
    } else {
      $noFavorites.className = '';
    }
  }
}

var $hamburger = document.querySelector('#hamburger');
$hamburger.addEventListener('click', hamburgerOverlay);
var $hamburgerOverlay = document.querySelector('#hamburger-overlay');
function hamburgerOverlay(event) {
  if (event.target.matches('#hamburger')) {
    $hamburgerOverlay.className = 'overlay';
  }
}

var $newSearchHamburgerButton = document.querySelector('#new-search-hamburger');
$newSearchHamburgerButton.addEventListener('click', newSearchPageHamburger);
function newSearchPageHamburger(event) {
  if (event.target.matches('#new-search-hamburger')) {
    viewSwap('search-page');
    $hamburgerOverlay.className = 'overlay hidden';
  }
}

var $favoritesHamburgerButton = document.querySelector('#favorites-hamburger');
$favoritesHamburgerButton.addEventListener('click', favoritesPageHamburger);
function favoritesPageHamburger(event) {
  if (event.target.matches('#favorites-hamburger')) {
    viewSwap('favorite-page');
    $hamburgerOverlay.className = 'overlay hidden';
  }
  if (data.favorites.length > 0) {
    $loader.className = 'loader-wrapper';
  } else {
    $noFavorites.className = '';
  }
}

var $favoriteList = document.querySelector('.favorite-list');
$likeIcon.addEventListener('click', addToFavorites);

function addToFavorites(event) {
  var cityForecast = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.cityInfo[0].lat.toString() + '&lon=' + data.cityInfo[0].lon.toString() + '&units=imperial&appid=590354b7597fbc0d3a66d188da5ee2a9';
  var xhrForecast = new XMLHttpRequest();
  xhrForecast.open('GET', cityForecast);
  xhrForecast.responseType = 'json';
  xhrForecast.addEventListener('load', function () {
    if (data.favorites.length === 0) {
      data.favorites.push(this.response);
      $favoriteList.append(renderCity(this.response));
    } else {
      var seen = 0;
      for (let i = 0; i < data.favorites.length; i++) {
        if (this.response.id === data.favorites[i].id) {
          seen = 1;
        }
      }
      if (seen === 0) {
        data.favorites.push(this.response);
        $favoriteList.append(renderCity(this.response));
      }
    }
  });
  xhrForecast.send();
}

$favoritesHamburgerButton.addEventListener('click', updateFavorites);
$favoritesButton.addEventListener('click', updateFavorites);

function updateFavorites(event) {
  for (let i = 0; i < data.favorites.length; i++) {
    var cityForecast = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.favorites[i].coord.lat.toString() + '&lon=' + data.favorites[i].coord.lon.toString() + '&units=imperial&appid=590354b7597fbc0d3a66d188da5ee2a9';
    var xhrForecast = new XMLHttpRequest();
    xhrForecast.open('GET', cityForecast);
    xhrForecast.responseType = 'json';
    xhrForecast.addEventListener('load', function () {
      var $favoritesListLi = document.querySelectorAll('.li-fav');
      for (let index = 0; index < $favoritesListLi.length; index++) {
        if (Number($favoritesListLi[index].getAttribute('id')) === this.response.id) {
          var updateCity = renderCity(this.response);
          $favoritesListLi[index].replaceWith(updateCity);
        }
      }
      $loader.className = 'loader-wrapper hidden';

    });
    xhrForecast.send();
  }
}

function renderCity(city) {
  var li = document.createElement('li');
  li.setAttribute('class', 'white-text column-half mt-10px li-fav');
  li.setAttribute('id', city.id);
  var div = document.createElement('div');
  div.setAttribute('class', 'row justify-center');
  li.appendChild(div);
  var div1 = document.createElement('div');
  div1.setAttribute('class', 'column-full');
  div.appendChild(div1);
  var name = document.createElement('h1');
  name.setAttribute('class', 'city-name');
  name.appendChild(document.createTextNode(city.name));
  div1.appendChild(name);
  var div2 = document.createElement('div');
  div2.setAttribute('class', 'row justify-center align-center');
  li.appendChild(div2);
  var div3 = document.createElement('div');
  div3.setAttribute('class', 'column-one-third flex justify-center justify-end');
  div2.appendChild(div3);
  var img = document.createElement('img');
  img.setAttribute('class', 'open-weather-icon');
  img.setAttribute('src', 'https://openweathermap.org/img/wn/' + city.weather[0].icon + '@2x.png');
  div3.appendChild(img);
  var div4 = document.createElement('div');
  div4.setAttribute('class', 'column-one-third flex justify-center');
  div2.appendChild(div4);
  var temp = document.createElement('h2');
  temp.setAttribute('class', 'temperature');
  temp.appendChild(document.createTextNode(Math.round(city.main.temp) + '°F'));
  div4.appendChild(temp);
  var div5 = document.createElement('div');
  div5.setAttribute('class', 'column-one-third padding-left-15px');
  div2.appendChild(div5);
  var divNew8 = document.createElement('div');
  divNew8.setAttribute('class', 'row justify-center justify-start');
  div5.appendChild(divNew8);
  var tempMax = document.createElement('h3');
  tempMax.setAttribute('class', 'high-temp');
  tempMax.appendChild(document.createTextNode(Math.round(city.main.temp_max) + '°'));
  divNew8.appendChild(tempMax);
  var divNew9 = document.createElement('div');
  divNew9.setAttribute('class', 'row justify-center justify-start');
  div5.appendChild(divNew9);
  var tempMin = document.createElement('h3');
  tempMin.setAttribute('class', 'low-temp');
  tempMin.appendChild(document.createTextNode(Math.round(city.main.temp_min) + '°'));
  divNew9.appendChild(tempMin);
  var div6 = document.createElement('div');
  div6.setAttribute('class', 'row justify-center mb-2rem');
  li.appendChild(div6);
  var div7 = document.createElement('div');
  div7.setAttribute('class', 'column-full');
  div6.appendChild(div7);
  var condition = document.createElement('h3');
  condition.setAttribute('class', 'condition');
  condition.appendChild(document.createTextNode(city.weather[0].description));
  div7.appendChild(condition);
  var div8 = document.createElement('div');
  div8.setAttribute('class', 'row mb-2rem');
  li.appendChild(div8);
  var div9 = document.createElement('div');
  div9.setAttribute('class', 'col-half');
  div8.appendChild(div9);
  var divNew = document.createElement('div');
  divNew.setAttribute('class', 'justify-center flex');
  div9.appendChild(divNew);
  var feelsLike = document.createElement('h3');
  feelsLike.setAttribute('class', 'feels-like');
  feelsLike.appendChild(document.createTextNode(Math.round(city.main.feels_like) + '°'));
  divNew.appendChild(feelsLike);
  var divNew1 = document.createElement('div');
  divNew1.setAttribute('class', 'justify-center flex');
  div9.appendChild(divNew1);
  var feelsLikeText = document.createElement('h3');
  feelsLikeText.appendChild(document.createTextNode('Feels Like'));
  divNew1.appendChild(feelsLikeText);
  var div10 = document.createElement('div');
  div10.setAttribute('class', 'col-half');
  div8.appendChild(div10);
  var divNew2 = document.createElement('div');
  divNew2.setAttribute('class', 'justify-center flex');
  div10.appendChild(divNew2);
  var humidity = document.createElement('h3');
  humidity.setAttribute('class', 'humidity');
  humidity.appendChild(document.createTextNode(city.main.humidity + '%'));
  divNew2.appendChild(humidity);
  var divNew3 = document.createElement('div');
  divNew3.setAttribute('class', 'justify-center flex');
  div10.appendChild(divNew3);
  var humidityText = document.createElement('h3');
  humidityText.appendChild(document.createTextNode('Humidity'));
  divNew3.appendChild(humidityText);
  var div11 = document.createElement('div');
  div11.setAttribute('class', 'row mt-dt');
  li.appendChild(div11);
  var div12 = document.createElement('div');
  div12.setAttribute('class', 'col-half');
  div11.appendChild(div12);
  var divNew4 = document.createElement('div');
  divNew4.setAttribute('class', 'justify-center flex');
  div12.appendChild(divNew4);
  var wind = document.createElement('h3');
  wind.setAttribute('class', 'wind');
  wind.appendChild(document.createTextNode(Math.round(city.wind.speed) + 'mph'));
  divNew4.appendChild(wind);
  var divNew5 = document.createElement('div');
  divNew5.setAttribute('class', 'justify-center flex');
  div12.appendChild(divNew5);
  var windText = document.createElement('h3');
  windText.appendChild(document.createTextNode('Wind Speed'));
  divNew5.appendChild(windText);
  var div13 = document.createElement('div');
  div13.setAttribute('class', 'col-half');
  div11.appendChild(div13);
  var divNew6 = document.createElement('div');
  divNew6.setAttribute('class', 'justify-center flex');
  div13.appendChild(divNew6);
  var visibility = document.createElement('h3');
  visibility.setAttribute('class', 'visibility');
  visibility.appendChild(document.createTextNode(city.visibility + 'km'));
  divNew6.appendChild(visibility);
  var divNew7 = document.createElement('div');
  divNew7.setAttribute('class', 'justify-center flex');
  div13.appendChild(divNew7);
  var visibilityText = document.createElement('h3');
  visibilityText.appendChild(document.createTextNode('Visibility'));
  divNew7.appendChild(visibilityText);
  var div14 = document.createElement('div');
  div14.setAttribute('class', 'row justify-end-trash');
  li.appendChild(div14);
  var div15 = document.createElement('div');
  div15.setAttribute('class', 'column-full');
  div14.appendChild(div15);
  var trashIcon = document.createElement('i');
  trashIcon.setAttribute('class', 'fa-regular fa-trash-can trash-icon');
  div15.appendChild(trashIcon);
  return li;
}
var $trashIconOverlay = document.querySelector('#trash-icon-overlay');
$favoriteList.addEventListener('click', showDeleteModal);
function showDeleteModal(event) {
  if (event.target.closest('i')) {
    $trashIconOverlay.className = 'row justify-center overlay';
    var li = event.target.closest('li');
    data.editing = Number(li.getAttribute('id'));
    var $yesButton = document.querySelector('.yes-button');
    $yesButton.addEventListener('click', function () {
      if (data.editing === Number(li.getAttribute('id'))) {
        deleteCity(li);
      }
    });
  }
}

var $noButton = document.querySelector('.no-button');
$noButton.addEventListener('click', hideDeleteModal);

function hideDeleteModal(event) {
  $trashIconOverlay.className = 'row justify-center overlay hidden';
}

function deleteCity(event) {
  for (let i = 0; i < data.favorites.length; i++) {
    if (data.favorites[i].id === data.editing) {
      data.favorites.splice(i, 1);
    }
  }
  var li = event;
  li.remove();
  $trashIconOverlay.className = 'row justify-center overlay hidden';
  if (data.favorites.length === 0) {
    viewSwap('search-page');
  }
}

var $toSearchPage = document.querySelector('#logo-header');
$toSearchPage.addEventListener('click', toSearchPage);

function toSearchPage() {
  viewSwap('search-page');
}

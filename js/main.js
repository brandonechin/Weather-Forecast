var $weatherForm = document.querySelector('#weather-form');
$weatherForm.addEventListener('submit', searchCity);

function searchCity(event) {
  event.preventDefault();

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
  var cityInfoLatLon = 'http://api.openweathermap.org/geo/1.0/direct?q=' + data.cities[0].cityName + '&appid=590354b7597fbc0d3a66d188da5ee2a9';
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

function getForecastInfo(event) {
  var cityForecast = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.cityInfo[0].lat.toString() + '&lon=' + data.cityInfo[0].lon.toString() + '&units=imperial&appid=590354b7597fbc0d3a66d188da5ee2a9';
  var xhrForecast = new XMLHttpRequest();
  xhrForecast.open('GET', cityForecast);
  xhrForecast.responseType = 'json';
  xhrForecast.addEventListener('load', function () {
    $cityName.textContent = this.response.name;
    $icon.src = 'http://openweathermap.org/img/wn/' + this.response.weather[0].icon + '@2x.png';
    $temperature.textContent = this.response.main.temp + '°F';
    $highTemp.textContent = this.response.main.temp_max + '°';
    $lowTemp.textContent = this.response.main.temp_min + '°';
    $condition.textContent = this.response.weather[0].description;
    $feelsLike.textContent = this.response.main.feels_like + '°';
    $humidity.textContent = this.response.main.humidity + '%';
    $windSpeed.textContent = this.response.wind.speed + 'mph';
    $visibility.textContent = this.response.visibility + 'km';
  });
  xhrForecast.send();
}

var $searchPage = document.querySelector('#search-page');
var $cityPage = document.querySelector('#city-page');
var $favoritePage = document.querySelector('#favorite-page');
var $logoHeader = document.querySelector('#logo-header');
var $newSearchButton = document.querySelector('#new-search-button');
function viewSwap(viewtype) {
  data.view = viewtype;
  if (viewtype === 'search-page') {
    $searchPage.className = '';
    $cityPage.className = 'hidden';
    $favoritePage.className = 'hidden';
    $logoHeader.className = 'hidden';
    $newSearchButton.className = 'hidden';
  }
  if (viewtype === 'city-page') {
    $cityPage.className = '';
    $searchPage.className = 'hidden';
    $favoritePage.className = 'hidden';
    $newSearchButton.className = 'nav-anchors';
    $logoHeader.className = '';
  }
  if (viewtype === 'favorite-page') {
    $favoritePage.className = '';
    $searchPage.className = 'hidden';
    $cityPage.className = 'hidden';
    $newSearchButton.className = 'nav-anchors';
    $logoHeader.className = '';
  }
}

$newSearchButton.addEventListener('click', NewSearchButton);
function NewSearchButton(event) {
  if (event.target.matches('#new-search-button')) {
    viewSwap('search-page');
  }
}

var $favoritesButton = document.querySelector('#favorites-button');
$favoritesButton.addEventListener('click', favoritesPage);
function favoritesPage(event) {
  if (event.target.matches('#favorites-button')) {
    viewSwap('favorite-page');
  }
}

var $hamburger = document.querySelector('#hamburger');
$hamburger.addEventListener('click', hamburger);
var $overlay = document.querySelector('.overlay');
var $cloudImage = document.querySelector('#cloud-image');
function hamburger(event) {
  if (event.target.matches('#hamburger')) {
    $overlay.className = 'overlay';
    $cloudImage.className = 'column-full text-align-center';
  }
}

var $newSearchHamburgerButton = document.querySelector('#new-search-hamburger');
$newSearchHamburgerButton.addEventListener('click', newSearchPageHamburger);
function newSearchPageHamburger(event) {
  if (event.target.matches('#new-search-hamburger')) {
    viewSwap('search-page');
    $overlay.className = 'overlay hidden';
    $cloudImage.className = 'column-full text-align-center position-relative';
  }
}

var $favoritesHamburgerButton = document.querySelector('#favorites-hamburger');
$favoritesHamburgerButton.addEventListener('click', favoritesPageHamburger);
function favoritesPageHamburger(event) {
  if (event.target.matches('#favorites-hamburger')) {
    viewSwap('favorite-page');
    $overlay.className = 'overlay hidden';
  }
}

var $favoriteList = document.querySelector('.favorite-list');
// $likeIcon.addEventListener('click', pushToFavorites);
$likeIcon.addEventListener('click', addToFavorites);

function addToFavorites(event) {
  var cityForecast = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.cityInfo[0].lat.toString() + '&lon=' + data.cityInfo[0].lon.toString() + '&units=imperial&appid=590354b7597fbc0d3a66d188da5ee2a9';
  var xhrForecast = new XMLHttpRequest();
  xhrForecast.open('GET', cityForecast);
  xhrForecast.responseType = 'json';
  xhrForecast.addEventListener('load', function () {
    // console.log(this.response);
    pushToFavorites(this.response);
    // if (data.favorites.length === 0) {
    //   renderCity(this.response);
    // }
    for (let i = 0; i < data.favorites.length; i++) {
      renderCity(data.favorites[i]);
    }
  });
  xhrForecast.send();
}
// $favoritesSearch.addEventListener('click', updateFavorites);
// function updateFavorites(event) {
//   var cityForecast = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.cityInfo[0].lat.toString() + '&lon=' + data.cityInfo[0].lon.toString() + '&units=imperial&appid=590354b7597fbc0d3a66d188da5ee2a9';
//   var xhrForecast = new XMLHttpRequest();
//   xhrForecast.open('GET', cityForecast);
//   xhrForecast.responseType = 'json';
//   xhrForecast.addEventListener('load', function () {
//     for (let i = 0; i < data.favorites.length; i++) {
//       if (this.response.id === data.favorites[i].id) {
//         data.favorites[i] = renderCity(this.response);
//       }
//     }
//   });
//   xhrForecast.send();
// }

function pushToFavorites(city) {
  // console.log('test');

  if (data.favorites.length === 0) {
    data.favorites.push(city);
  } else {
    var bool = 0;
    for (let i = 0; i < data.favorites.length; i++) {
      // console.log(data.favorites.length);
      // console.log(city.id);
      // console.log(data.favorites[i].id);

      if (city.id === data.favorites[i].id) {
        bool = 1;
        continue;
      }
    }
    if (bool === 0) {
      data.favorites.push(city);
    }
  }
}

function renderCity(city) {
  var li = document.createElement('li');
  li.setAttribute('class', 'text-align-center white-text');
  li.setAttribute('city-entry-id', city.id);
  var div = document.createElement('div');
  div.setAttribute('class', 'row');
  li.appendChild(div);
  var div1 = document.createElement('div');
  div1.setAttribute('class', 'column-full');
  div.appendChild(div1);
  var name = document.createElement('h1');
  name.setAttribute('class', 'city-name');
  name.appendChild(document.createTextNode(city.name));
  div1.appendChild(name);
  var div2 = document.createElement('div');
  div2.setAttribute('class', 'row');
  li.appendChild(div2);
  var div3 = document.createElement('div');
  div3.setAttribute('class', 'column-one-third text-align-right-dt');
  div2.appendChild(div3);
  var img = document.createElement('img');
  img.setAttribute('class', 'open-weather-icon');
  img.setAttribute('src', 'http://openweathermap.org/img/wn/' + city.weather[0].icon + '@2x.png');
  div3.appendChild(img);
  var div4 = document.createElement('div');
  div4.setAttribute('class', 'column-one-third');
  div2.appendChild(div4);
  var temp = document.createElement('h2');
  temp.setAttribute('class', 'temperature');
  temp.appendChild(document.createTextNode(city.main.temp + '°F'));
  div4.appendChild(temp);
  var div5 = document.createElement('div');
  div5.setAttribute('class', 'column-one-third text-align-left-dt');
  div2.appendChild(div5);
  var tempMax = document.createElement('h3');
  tempMax.setAttribute('class', 'high-temp');
  tempMax.appendChild(document.createTextNode(city.main.temp_max + '°'));
  div5.appendChild(tempMax);
  var tempMin = document.createElement('h3');
  tempMin.setAttribute('class', 'low-temp');
  tempMin.appendChild(document.createTextNode(city.main.temp_min + '°'));
  div5.appendChild(tempMin);
  var div6 = document.createElement('div');
  div6.setAttribute('class', 'row');
  li.appendChild(div6);
  var div7 = document.createElement('div');
  div7.setAttribute('class', 'column-full');
  div6.appendChild(div7);
  var condition = document.createElement('h3');
  condition.setAttribute('class', 'condition');
  condition.appendChild(document.createTextNode(city.weather[0].description));
  div7.appendChild(condition);
  var div8 = document.createElement('div');
  div8.setAttribute('class', 'row mt-dt');
  li.appendChild(div8);
  var div9 = document.createElement('div');
  div9.setAttribute('class', 'column-half padding-left');
  div8.appendChild(div9);
  var feelsLike = document.createElement('h3');
  feelsLike.setAttribute('class', 'feels-like');
  feelsLike.appendChild(document.createTextNode(city.main.feels_like + '°'));
  div9.appendChild(feelsLike);
  var feelsLikeText = document.createElement('h3');
  feelsLikeText.appendChild(document.createTextNode('Feels Like'));
  div9.appendChild(feelsLikeText);
  var div10 = document.createElement('div');
  div10.setAttribute('class', 'column-half padding-right');
  div8.appendChild(div10);
  var humidity = document.createElement('h3');
  humidity.setAttribute('class', 'humidity');
  humidity.appendChild(document.createTextNode(city.main.humidity + '%'));
  div10.appendChild(humidity);
  var humidityText = document.createElement('h3');
  humidityText.appendChild(document.createTextNode('Humidity'));
  div10.appendChild(humidityText);
  var div11 = document.createElement('div');
  div11.setAttribute('class', 'row mt-dt');
  li.appendChild(div11);
  var div12 = document.createElement('div');
  div12.setAttribute('class', 'column-half padding-left');
  div11.appendChild(div12);
  var wind = document.createElement('h3');
  wind.setAttribute('class', 'wind');
  wind.appendChild(document.createTextNode(city.wind.speed + 'mph'));
  div12.appendChild(wind);
  var windText = document.createElement('h3');
  windText.appendChild(document.createTextNode('wind'));
  div12.appendChild(windText);
  var div13 = document.createElement('div');
  div13.setAttribute('class', 'column-half padding-right');
  div11.appendChild(div13);
  var visibility = document.createElement('h3');
  visibility.setAttribute('class', 'visibility');
  visibility.appendChild(document.createTextNode(city.visibility + 'km'));
  div13.appendChild(visibility);
  var visibilityText = document.createElement('h3');
  visibilityText.appendChild(document.createTextNode('Visibility'));
  div13.appendChild(visibilityText);
  var div14 = document.createElement('div');
  div14.setAttribute('class', 'row');
  li.appendChild(div14);
  var div15 = document.createElement('div');
  div15.setAttribute('class', 'column-full text-align-right padding-right-more');
  div14.appendChild(div15);
  var trashIcon = document.createElement('i');
  trashIcon.setAttribute('class', 'fa-regular fa-trash-can trash-icon');
  div15.appendChild(trashIcon);
  $favoriteList.append(li);
  return $favoriteList;
}

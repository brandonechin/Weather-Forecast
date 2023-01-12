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
var $icon = document.querySelector('.icon');
var $temperature = document.querySelector('.temperature');
var $highTemp = document.querySelector('.high-temp');
var $lowTemp = document.querySelector('.low-temp');
var $condition = document.querySelector('.condition');
var $feelsLike = document.querySelector('.feels-like');
var $humidity = document.querySelector('.humidity');
var $windSpeed = document.querySelector('.wind');
var $visibility = document.querySelector('.visibility');
function getForecastInfo(event) {
  var cityForecast = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.cityInfo[0].lat.toString() + '&lon=' + data.cityInfo[0].lon.toString() + '&units=imperial&appid=590354b7597fbc0d3a66d188da5ee2a9';
  var xhrForecast = new XMLHttpRequest();
  xhrForecast.open('GET', cityForecast);
  xhrForecast.responseType = 'json';
  xhrForecast.addEventListener('load', function () {
    data.cityForecast.unshift(xhrForecast.response);
    $cityName.textContent = this.response.name;
    $icon.src = 'http://openweathermap.org/img/wn/' + this.response.weather[0].icon + '@2x.png';
    $temperature.textContent = this.response.main.temp + '°F';
    $highTemp.textContent = this.response.main.temp_max + '°';
    $lowTemp.textContent = this.response.main.temp_min + '°';
    $condition.textContent = this.response.weather[0].description;
    $feelsLike.textContent = this.response.main.feels_like + '°';
    $humidity.textContent = this.response.main.humidity + '%';
    $windSpeed.textContent = this.respsonse.wind.speed + 'mph';
    $visibility.textContent = this.response.visibility + 'mi';
  });
  xhrForecast.send();
}

var $searchPage = document.querySelector('#search-page');
var $cityPage = document.querySelector('#city-page');
var $favoritePage = document.querySelector('#favorite-page');
function viewSwap(viewtype) {
  data.view = viewtype;
  if (viewtype === 'search-page') {
    $searchPage.className = '';
    $cityPage.className = 'hidden';
    $favoritePage.className = 'hidden';
  }
  if (viewtype === 'city-page') {
    $cityPage.className = '';
    $searchPage.className = 'hidden';
    $favoritePage.className = 'hidden';
  }
  if (viewtype === 'favorite-page') {
    $favoritePage.className = '';
    $searchPage.className = 'hidden';
    $cityPage.className = 'hidden';
  }
}

var $newSearchButtonCity = document.querySelector('#new-search-city');
$newSearchButtonCity.addEventListener('click', togglePage);
function togglePage(event) {
  if (event.target.matches('#new-search-city')) {
    viewSwap('search-page');
  }
}

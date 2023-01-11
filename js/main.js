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

function getForecastInfo(event) {
  var cityForecast = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.cityInfo[0].lat.toString() + '&lon=' + data.cityInfo[0].lon.toString() + '&appid=590354b7597fbc0d3a66d188da5ee2a9';
  var xhrForecast = new XMLHttpRequest();
  xhrForecast.open('GET', cityForecast);
  xhrForecast.responseType = 'json';
  xhrForecast.addEventListener('load', function () {
    data.cityForecast.unshift(xhrForecast.response);
  });
  xhrForecast.send();
}

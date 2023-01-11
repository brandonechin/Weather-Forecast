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

// $weatherForm.addEventListener('submit', getCityInfo);
// function getCityInfo(event) {
//   var miami = 'http://api.openweathermap.org/geo/1.0/direct?q=' + data.cities[0].cityName + '&appid=590354b7597fbc0d3a66d188da5ee2a9';
//   // var $user = document.querySelector('#user-list');
//   var xhrCity = new XMLHttpRequest();
//   xhrCity.open('GET', miami);
//   xhrCity.responseType = 'json';
//   xhrCity.addEventListener('load', function () {
//     console.log(xhrCity.status);
//     console.log(xhrCity.response);
//     data.cityInfo = xhrCity.response;
//   // for (let i = 0; i < this.response.length; i++) {
//   //   var li = document.createElement('li');
//   //   li.textContent = this.response[i].name;
//   //   $user.appendChild(li);
//   // }
//   });
//   xhrCity.send();
// }
// $weatherForm.addEventListener('submit', getForecastInfo);
// function getForecastInfo(event) {
//   var miamiInfo = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.cityInfo[0].lat.toString() + '&lon=' + data.cityInfo[0].lon.toString() + '&appid=590354b7597fbc0d3a66d188da5ee2a9';
//   console.log(miamiInfo);
//   var xhrWeather = new XMLHttpRequest();
//   xhrWeather.open('GET', miamiInfo);
//   xhrWeather.responseType = 'json';
//   xhrWeather.addEventListener('load', function () {
//     console.log(xhrWeather.status);
//     console.log(xhrWeather.response);
//     data.cityForecast = xhrWeather.response;
//   // for (let i = 0; i < this.response.length; i++) {
//   //   var li = document.createElement('li');
//   //   li.textContent = this.response[i].name;
//   //   $user.appendChild(li);
//   // }
//   });
//   xhrWeather.send();
// }

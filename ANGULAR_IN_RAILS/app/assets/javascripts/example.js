(function() {
  var app = angular.module('example', []);

  app.controller('getWeather', ['$http', function($http) {

    this.city = "Boston";
    this.toF = function(kelvin) {
      return Math.floor(1.8 * (kelvin - 273) + 32);
    }

    var weather = this;
    this.temperature = {};


    var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.city;

    $http.get(weatherURL).success(function(data) {
      weather.temperature = weather.toF(data["main"]["temp"]);
      weather.desc = data["weather"][0]["description"];
    });

  }]);
})();
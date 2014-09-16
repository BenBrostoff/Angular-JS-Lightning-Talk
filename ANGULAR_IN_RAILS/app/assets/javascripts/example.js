(function() {
  var app = angular.module('example', []);

  app.factory('weatherService', function(){
    var fact = {};
    fact.toFah = function(kelvin) {
      return Math.floor(1.8 * (kelvin - 273) + 32);
    }
    return fact; 
  });

  app.controller('getWeather', ['$http', 'weatherService', function($http, weatherService) {

    this.city = "Boston";

    this.toF = function(kelvin) {
      return weatherService.toFah(kelvin);
    }

    var weather = this;
    this.temperature = {};
    this.desc = {};

    var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.city;

    $http.get(weatherURL).success(function(data) {
      console.log("success ")
      weather.temperature = weather.toF(data["main"]["temp"]);
      weather.desc = data["weather"][0]["description"];
    });
  }]);

})();
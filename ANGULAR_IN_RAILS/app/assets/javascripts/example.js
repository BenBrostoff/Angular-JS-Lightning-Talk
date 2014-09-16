(function() {
  var app = angular.module('example', []);

  app.factory('weatherService', function($http, $q){
    var fact = {};

    fact.toFah = function(kelvin) {
      return Math.floor(1.8 * (kelvin - 273) + 32);
    }

    fact.getWeather = function(city){
      
      var weather = this;
      var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;

      $http.get(weatherURL).success(function(data) {
        console.log("XYZ");
        weather.temperature = weather.toFah(data["main"]["temp"]);
        weather.desc = data["weather"][0]["description"];
      });
      
    }
    return fact; 
  });

  // dependency injection with our custom service 
  app.controller('getWeather', ['weatherService', function(weatherService) {

    this.city = "Boston";

    this.toF = function(kelvin) {
      return weatherService.toFah(kelvin);
    }
    

    this.updateWeather = function(city){
      weatherService.getWeather(city);

      this.temperature = weatherService.temperature;
      this.desc = weatherService.desc;
    }

  }]);

})();
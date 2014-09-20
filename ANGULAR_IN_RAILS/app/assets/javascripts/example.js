(function() {
  var app = angular.module('example', ['templates']);

  app.factory('weatherService', function($http, $q){
    var fact = {};

    fact.toFah = function(kelvin) {
      return Math.floor(1.8 * (kelvin - 273) + 32) + " F";
    }

    fact.getWeather = function(object, city){
      
      object.city = city;
      var weather = this;
      var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;

      $http.get(weatherURL).success(function(data) {
        object.temperature = weather.toFah(data["main"]["temp"]);
        object.desc = data["weather"][0]["description"];
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
    

    this.updateWeather = function(city) {
        weatherService.getWeather(this, city)
    };

    this.updateWeather(this.city);

  }]);

  app.controller('getWords', [ function() {
    
    this.revealForm = function() {
      this.showFeeling = false;
    }

    this.updateFeeling = function(feeling) {
      localStorage.setItem("words", feeling);
      this.feeling = feeling;
      this.showFeeling = true;
    }

    if (localStorage["words"] == undefined) {
      this.feeling = "";
      this.showFeeling = false;
    } 

    else{
      this.feeling = localStorage["words"];
      this.showFeeling = true; 
    }

  }]);

  // custom weather directive
  app.directive('weather', function($templateCache){
    return {
      restrict: 'E',
      template: $templateCache.get("weather.html")
    }
  }); 

  // custom words directive
  app.directive('words', function($templateCache){
    return {
      restrict: 'E',
      template: $templateCache.get("words.html")
    }
  }); 

})();
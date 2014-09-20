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
    this.visibility = false

    this.revealWeather = function(){
      this.visibility = !this.visibility;
    }

    this.toF = function(kelvin) {
      return weatherService.toFah(kelvin);
    }
    

    this.updateWeather = function(city) {
      weatherService.getWeather(this, city)
    };

    this.updateWeather(this.city);

  }]);

  app.controller('getWords', [ function() {
    this.visibility = false;

    this.revealForm = function() {
      this.visibility = !this.visibility;
    }

    this.updateFeeling = function(feeling) {
      this.visibility = !this.visibility;
      localStorage.setItem("words", feeling);
      this.feeling = feeling;
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

  app.controller('getFitness', [ function() {
    this.visibility = false;

    this.revealFitness = function(){
      this.visibility = !this.visibility;
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

  // custom fitness directive
  app.directive('fitness', function($templateCache){
    return {
      restrict: 'E',
      template: $templateCache.get("fitness.html")
    }
  });

})();
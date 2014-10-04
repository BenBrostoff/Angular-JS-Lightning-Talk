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

  app.factory('summaryService', function($http, $q){
    var fact = {};

    fact.sendSummary = function(message){
      
      summaryURL = "/email";
       $http({
            url: summaryURL,
            method: "POST",
            data: {"message": message} 
          });      
    }

    return fact; 
  });

  app.factory('milesService', function($http, $q){
    var fact = {};

    fact.getMiles = function(object){
      
      object.miles = 0;
      object.steps = 0;
      milesURL = "/miles";

      $http.get(milesURL).success(function(data) {
        object.miles = data.miles;
        object.steps = data.steps;
      });
      
    }
    return fact; 
  });


  app.factory('codeService', function($http, $q){
    var fact = {};

    fact.getCode = function(object){
      
      object.stats = 0;
      codeURL = "/code";

      $http.get(codeURL).success(function(data) {
        console.log(data)
        object.stats = data.code;
      });
      
    }
    return fact; 
  });

  app.controller('getNow', ["$scope", "$interval", function($scope, $interval) {
    $scope.now = new Date();

    var timer = function() {
      $scope.now = new Date();
    }

    updateTime = $interval(timer, 1000);

  }]);

  app.controller('getSummary', ['summaryService', function(summaryService) {

    this.visi = false;

    this.revealSummary = function() {
      this.visi = !this.visi;
    }

    this.summarize = function(message) {
      summaryService.sendSummary(message);
    }

  }]);

  app.controller('getCode', ['codeService', function(codeService) {

    this.stats = 0;
    this.visi = false;

    this.revealCode = function() {
      console.log("BAM")
      this.visi = !this.visi;
    }

    this.updateCode = function() {
      codeService.getCode(this);
    };

    this.prepare = function(){
      this.updateCode();
      this.revealCode();
    }



  }]);

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
      this.feeling = "";
    }

    this.updateFeeling = function(feeling) {
      this.visibility = !this.visibility;
      localStorage.setItem("words", feeling);
      this.feeling = "";
    }

    if (localStorage["words"] == undefined) {
      this.feeling = "Enter goals here";
      this.showFeeling = false;
    } 

    else{
      this.feeling = localStorage["words"];
      this.showFeeling = true; 
    }
  }]);

  app.controller('getFitness', ['milesService', function(milesService) {
    this.visibility = false;
    this.miles = 0;

    this.updateMiles = function() {
      milesService.getMiles(this);
    }

    this.revealFitness = function(){
      this.visibility = !this.visibility;
    }

    this.prepare = function(){
      this.updateMiles();
      this.revealFitness();
    }
  }]);

  app.directive('now', function(){
    return {
      restrict: 'E',
      template: "{{now | date:'medium'}}"
    }
  });

  app.directive('summary', function($templateCache){
    return {
      restrict: 'E',
      template: $templateCache.get("summary.html")
    }
  }); 

  app.directive('weather', function($templateCache){
    return {
      restrict: 'E',
      template: $templateCache.get("weather.html")
    }
  }); 

  app.directive('words', function($templateCache){
    return {
      restrict: 'E',
      template: $templateCache.get("words.html")
    }
  }); 

  app.directive('code', function($templateCache){
    return {
      restrict: 'E',
      template: $templateCache.get("code.html")
    }
  });

  app.directive('fitness', function($templateCache){
    return {
      restrict: 'E',
      template: $templateCache.get("fitness.html")
    }
  });

})();
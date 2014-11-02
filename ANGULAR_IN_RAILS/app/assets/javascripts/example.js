(function() {
  var app = angular.module('example', ['templates']);

  app.factory('summaryService', function($http, $q){
    var fact = {};

    fact.sendSummary = function(message){
      
       $http({
            url: "/email",
            method: "POST",
            data: {"message": message} 
          });      
    }

    return fact; 
  });

  app.factory('bookService', function($http){
    var fact = {};

    fact.sendBook = function(bookForm){
      
       $http({
            url: "/book",
            method: "POST",
            data: { "title": bookForm.title, 
                    "author": bookForm.author, 
                    "time": bookForm.time } 
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

  app.controller('getLater', ["$scope", "$interval", function($scope, $interval) {
    convert = 60 * 60 * 1000 *  24 * 365

    $scope.later = (Date.now() - new Date(1989, 11, 6, 0, 0, 0, 0))/convert;

    var deciPlace = function(mili, hang) {
      return parseFloat(mili).toFixed(hang);  
    }

    var later = function() {
      age =  (Date.now() - new Date(1989, 11, 6, 0, 0, 0, 0))/convert;
      $scope.later = deciPlace(age, 8)
    }

    updateLater = $interval(later, 1);
  }]);

  app.controller('getSummary', ['summaryService', function(summaryService) {

    this.visi = false;

    this.revealSummary = function() {
      this.visi = !this.visi;
    }

    this.summarize = function(message) {
      summaryService.sendSummary(message);
      document.getElementById("emailForm").reset();
      this.revealSummary();
    }

  }]);

  app.controller('getBook', ['bookService', function(bookService) {

    this.visi = false;

    this.revealBook = function() {
      this.visi = !this.visi;
    }

    this.bookify = function(bookForm) {
      bookService.sendBook(bookForm);
      document.getElementById("bookForm").reset();
      this.revealBook();
    }

  }]);

  app.controller('getCode', ['codeService', function(codeService) {

    this.stats = 0;
    this.visi = false;

    this.revealCode = function() {
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

  app.directive('later', function(){
    return {
      restrict: 'E',
      template: "{{later}}"
    }
  });

  app.directive('summary', function($templateCache){
    return {
      restrict: 'E',
      template: $templateCache.get("summary.html")
    }
  }); 

  app.directive('book', function($templateCache){
    return {
      restrict: 'E',
      template: $templateCache.get("book.html")
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
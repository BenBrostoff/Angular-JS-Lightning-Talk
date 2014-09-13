// Wrap in anonymous function
(function(){
  // Declare module
  var app = angular.module('starCreate', []);

  // Declare controller
  // Controllers are capital case
  app.controller('StarController', function($scope) {
    $scope.test = test;
    this.stars = stars;
    this.createStar = function(form) {
      stars.push(new Star(form.name, form.age, form.quote, form.signed));
    }
  });

  var Star = function(name, age, quote, signed) {
    this.name = name;
    this.age = age;
    this.quote = quote;
    this.signed = signed;
  };

  Star.prototype.signStar = function() {
    this.signed = true;
  }

  Star.prototype.releaseStar = function() {
    this.signed = false;
  }

  Star.prototype.color = function() {
    if (this.signed == true) return "#76EEC6";
    else return "#ECF1EF";
  }

  var stars = [ new Star("Adam Sandler", 48, "You can do it!", false),
                new Star("Matt Damon", 43, "Do you like apples?", true)];

// Call function immediately
})();

// Wrap in anonymous function and call immediately
(function(){
  // Declare module
  var app = angular.module('starCreate', []);

  // Declare controller
  // Controllers are capital case
  app.controller('StarController', function() {
    this.stars = stars;
    this.createStar = function(form) {
      console.log("HE");
      stars.push(new Star(form.name, form.age, form.quote, false));
      console.log(this.stars);
    }
  });

  var Star = function(name, age, quote) {
    this.name = name;
    this.age = age;
    this.quote = quote;
    this.signed = false;
  };

  Star.prototype.signStar = function() {
    this.signed = true;
  }

  Star.prototype.releaseStar = function() {
    this.signed = false;
  }

  var stars = [ new Star("Adam Sandler", 48, "You can do it!"),
                new Star("Matt Damon", 43, "Do you like apples?" )];


})();

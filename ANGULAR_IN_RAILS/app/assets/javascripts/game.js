(function() {
  var game = angular.module('game', []);

  game.controller('playGame', ["$scope", "$interval", function($scope, $interval) {

    var sounds = ["Alpha", "Beta", "Epsilion", "Red Seventy", "Tranquility", "Blue Bird",
                  "Piper", "G Force"];
    var soundKey = {}

    this.sayHello = function() {
      var msg = new SpeechSynthesisUtterance('Hello World');
      window.speechSynthesis.speak(msg);
    }


  }]);


})();
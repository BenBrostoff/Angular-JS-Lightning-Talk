(function() {
  var game = angular.module('game', []);

  game.controller('playGame', ["$scope", "$interval", function($scope, $interval) {

    this.answer = false
    var sounds = ["Alpha", "Beta", "Epsilion"];
    var soundKey = {}


    formattedKey = ""

    var scramble = function() {
      var soundMix = Shuffle(sounds)
      var keyMix = Shuffle(soundMix)
      for(i = 0; i < 3; i++) {
        soundKey[soundMix[i]] = i
        formattedKey += keyMix[i] + " => " + i + " || "
      }
    }()

    answerCode = ""
    for(i = 0; i < 3; i++) {
      answerCode += Shuffle(sounds)[i] += "      ."
    }

    close = this;

    this.answerCode = soundKey;

    this.sayHello = function() {
      var msg = new SpeechSynthesisUtterance(answerCode);
      window.speechSynthesis.speak(msg);
      $('#answer')[0].innerHTML = formattedKey;  
      
      this.hideAnswer()
    }


    this.hideAnswer = function() {
      window.setTimeout(function(){
        $('#answer')[0].innerHTML = '';  
        }, 3000)
    }

  }]);


})();
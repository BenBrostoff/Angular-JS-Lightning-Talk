(function() {
  var game = angular.module('game', []);

  game.factory('gameService', function($http, $q){
    var fact = {};

    fact.sendGame = function(score){
      console.log(score);
      
       $http({
            url: "/log_score",
            method: "POST",
            data: {"score": score} 
          });      
    }

    return fact; 
  });

  game.controller('playGame', ['gameService', function(gameService) {
    close = this;

    var sounds = ["Alpha", "Beta", "Epsilion", "Reddington", "Kangaroo",
                  "Ellington", "Chronologic", "Keeper", "Shoptop", "Ruggles"];
    var soundKey = {};
    var answerCodeArray = []
    var formattedKey = "";
    var answerCode = "";
    var correctAnswer = "";

    var reset = function() {
      soundKey = {};
      answerCodeArray = []
      formattedKey = "";
      answerCode = "";
    }

    var Initialize = function() {
      close.diff = parseInt($("#difficulty").val())
      correctAnswer = "";

      var scramble = function() {
        var soundMix = Shuffle(sounds).slice(0, close.diff)
        var keyMix = Shuffle(soundMix)
        for(i = 0; i < close.diff; i++) {
          soundKey[soundMix[i]] = i
          formattedKey += keyMix[i] + " => " + i + " || "
        }
        for(i = 0; i < close.diff; i++) {
          answerCodeArray.push(Shuffle(soundMix)[i])
          answerCode += answerCodeArray[i] + "  ."
          correctAnswer += soundKey[answerCodeArray[i]]
        }}();

      close.answerCode = soundKey;
      close.correctAnswer = correctAnswer;

    }

    this.sayHello = function() {
      Initialize(); 
      console.log(correctAnswer);

      var msg = new SpeechSynthesisUtterance(answerCode);
      window.speechSynthesis.speak(msg);

      $('#answer')[0].innerHTML = formattedKey;  
      
      this.hideAnswer();
      reset();
    }

 
    this.hideAnswer = function() {
      window.setTimeout(function(){
        $('#answer')[0].innerHTML = '';  
        }, 5000)
    };

    this.checkAnswer = function(userAnswer) {
      if (correctAnswer == userAnswer) {
        alert("Great job!")
        gameService.sendGame(close.diff);
      }
      else {
        alert("Nope.")
      }
    }
  }]);

})();
(function() {
  var game = angular.module('game', []);

  game.controller('playGame', function() {

    this.answer = false;
    var sounds = ["Alpha", "Beta", "Epsilion"];
    var soundKey = {};
    var answerCodeArray = []
    var formattedKey = "";
    var answerCode = "";
    var correctAnswer = "";
    var close = this;

    var reset = function() {
      soundKey = {};
      answerCodeArray = []
      formattedKey = "";
      answerCode = "";
      close = this;
    }

    var Initialize = function() {
      correctAnswer = "";

      var scramble = function() {
        var soundMix = Shuffle(sounds)
        var keyMix = Shuffle(soundMix)
        for(i = 0; i < 3; i++) {
          soundKey[soundMix[i]] = i
          formattedKey += keyMix[i] + " => " + i + " || "
        }
      }()

      for(i = 0; i < 3; i++) {
        answerCodeArray.push(Shuffle(sounds)[i])
        answerCode += answerCodeArray[i] + "  ."
        correctAnswer += soundKey[answerCodeArray[i]]
      }

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
        }, 3000)
    };

    this.checkAnswer = function(userAnswer) {
      console.log(correctAnswer);
      console.log(userAnswer);
      if (correctAnswer == userAnswer) {
        alert("Great job!")
      }
      else {
        alert("Nope.")
      }
    }
  });


})();
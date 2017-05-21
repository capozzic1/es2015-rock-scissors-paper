"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = function () {
  var Player = function () {
    function Player() {
      _classCallCheck(this, Player);

      this.score = 0;
      this.choice = null;
    }

    _createClass(Player, [{
      key: "getPlayerInput",

      //player chooses rock scissors or paper
      value: function getPlayerInput() {
        var _this = this;

        var input = document.querySelectorAll(".choice");
        for (var i = 0, len = input.length; i < len; i++) {
          input[i].onclick = function (event) {

            var choice = event.target.dataset.tag;

            switch (choice) {
              case "rock":

                _this.choice = "rock";

                break;
              case "scissors":
                _this.choice = "scissors";
                break;
              case "paper":
                _this.choice = "paper";
                break;
            }
            game.hideInfo();
            game.displayAnimation(_this.choice, computer.choice);
          };
        }
      }

      //computer chooses rock, scissors, or paper

    }, {
      key: "getComputerInput",
      value: function getComputerInput() {
        var randomNum = Math.floor(Math.random() * 3 + 1);

        switch (randomNum) {
          case 1:
            this.choice = "rock";
            break;
          case 2:
            this.choice = "paper";
            break;
          case 3:
            this.choice = "scissors";
            break;

        }
      }
    }, {
      key: "points",
      set: function set(num) {
        this.score = num;
      }
    }, {
      key: "_choice",
      set: function set(string) {
        this.choice = string;
      }
    }]);

    return Player;
  }();
  //A game class with some properties


  var Game = function () {
    function Game(round) {
      _classCallCheck(this, Game);

      this.round = 1;
      this.animDone = false;
      this.gamePics = ['img/paper.png', 'img/rock.png', 'img/scissors.png'];
    }
    //Compares input of player and computer


    _createClass(Game, [{
      key: "compareInput",
      value: function compareInput() {
        var _this2 = this;

        var gameInterval = setInterval(function () {

          if (_this2.animDone == true) {
            switch (true) {

              case player.choice == "rock" && computer.choice == "scissors":
                player.score += 1;
                game.displayWinner("Player wins!");
                break;

              case computer.choice == "rock" && player.choice == "scissors":
                computer.score += 1;
                game.displayWinner("Computer wins!");
                break;
              case player.choice == "paper" && computer.choice == "rock":
                player.score += 1;
                game.displayWinner("Player wins!");
                break;
              case computer.choice == "paper" && player.choice == "rock":
                computer.score += 1;
                game.displayWinner("Computer wins!");
                break;
              case player.choice == "scissors" && computer.choice == "paper":
                player.score += 1;
                game.displayWinner("Player wins!");
                break;
              case computer.choice == "scissors" && player.choice == "paper":
                computer.score += 1;
                game.displayWinner("Computer wins!");
                break;
              case computer.choice == "scissors" && player.choice == "scissors":
                game.displayWinner("It's a draw!");
                break;
              case computer.choice == "paper" && player.choice == "paper":
                game.displayWinner("It's a draw!");
                break;
              case computer.choice == "rock" && player.choice == "rock":
                game.displayWinner("It's a draw!");
                break;

            }
            //handle what to do after a player/computer wins
            game.round += 1;
            game.displayRound(game.round);
            game.displayScore(player.score, computer.score);
            clearInterval(gameInterval);
            game.animDone = false;
            game.checkWinner(player.score, computer.score);
            game.newRound();
          }
        }, 1000);
      }
    }, {
      key: "displayWinner",
      value: function displayWinner(input) {
        var span = document.querySelector(".g-winner");
        span.innerHTML = input;
      }
    }, {
      key: "displayScore",
      value: function displayScore(pscore, cscore) {
        //set player's score to display in the span
        $('.p-score').html(pscore);
        //set computer's score to display in the span
        $('.c-score').html(cscore);
      }
    }, {
      key: "displayRound",
      value: function displayRound(round) {

        $('.round').html(round);
      }
    }, {
      key: "displayAnimation",
      value: function displayAnimation(choice, compchoice) {

        var img = document.querySelector(".p-anim");
        var img2 = document.querySelector(".c-anim");
        var input = choice;
        var input2 = compchoice;

        var counter = 0;

        var animInterval = setInterval(newPic, 700);
        var self = this;

        function newPic() {

          $('.p-anim, .c-anim').effect('shake', { direction: "up" }, { distance: 30 }, { times: 3 });
          img.src = self.gamePics[1];
          img2.src = self.gamePics[1];

          counter += 1;

          if (counter == 3) {
            var _self$lastAnimPic = self.lastAnimPic(input, input2),
                _self$lastAnimPic2 = _slicedToArray(_self$lastAnimPic, 2),
                first = _self$lastAnimPic2[0],
                second = _self$lastAnimPic2[1];

            console.log(first, second, "test");
            img.src = game.gamePics[first];
            img2.src = game.gamePics[second];
            game.animDone = true;

            clearInterval(animInterval);
          }
        }
      }
      //this function returns an array that is used to set the last animation picture
      //to what the user or computer chose

    }, {
      key: "lastAnimPic",
      value: function lastAnimPic(choice1, choice2) {

        var idxs = [];

        for (var i = 0, len = this.gamePics.length; i < len; i++) {

          if (choice1 == choice2 && this.gamePics[i].indexOf(choice1) != -1) {
            idxs[0] = i;
            idxs[1] = i;
          } else if (this.gamePics[i].indexOf(choice2) != -1) {
            idxs[1] = i;
          } else if (this.gamePics[i].indexOf(choice1) != -1) {
            idxs[0] = i;
          }
        }

        return idxs;
      }
    }, {
      key: "hideInfo",
      value: function hideInfo() {
        $('.choices, .scores').fadeOut();
      }
    }, {
      key: "init",
      value: function init() {
        //player gives choice
        player.getPlayerInput();
        //computer gives choice
        computer.getComputerInput();
        //choices are compared
        game.compareInput();
        //fade out winner/loser divs
        $('.winner, .loser').fadeOut();
      }
    }, {
      key: "newRound",
      value: function newRound() {

        $('.choices, .scores').fadeIn();

        player.getPlayerInput();
        //computer gives choice
        computer.getComputerInput();
        //choices are compared
        game.compareInput();
      }
    }, {
      key: "checkWinner",
      value: function checkWinner(pscore, cscore) {

        if (pscore === 3) {
          $('.winlose').html("You are the final game winner!");
          $('.winner').fadeIn();
        } else if (cscore === 3) {
          $('.winlose').html("The computer is the final game winner!");
          $('.loser').fadeIn();
        }

        $('.instruct').fadeOut();
      }
    }]);

    return Game;
  }();

  var game = new Game();
  var player = new Player();
  var computer = new Player();

  game.init();
}();

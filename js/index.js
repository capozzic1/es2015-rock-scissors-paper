//rock scissor paper game
//revealing module pattern

//es6 let, classes, modules, rest/spread, arrow functs
//best out of 3 games is the winner

//prompt player for rock, paper, or scissors
//player has 3 to choose pictures to choose from

//game starts
//random number is generated for computer opponent
//score is kept for both comp and user
//on next round, user chooses another from rps
//keeps going until round 3 occurs
let Module = (function (){

class Player {
  constructor() {
    this.score = 0;
    this.choice = null;
  }
  set points(num) {
    this.score = num;
  }

  set _choice(string) {
    this.choice = string;
  }
  //player chooses rock scissors or paper
  getPlayerInput() {

    let input = document.querySelectorAll(".choice");
    for (let i = 0, len = input.length; i < len; i++) {
      input[i].onclick = event => {

        let choice = event.target.dataset.tag;

        switch (choice) {
          case "rock":

            this.choice = "rock";

            break;
          case "scissors":
            this.choice = "scissors";
            break;
          case "paper":
            this.choice = "paper";
            break;
        }
        game.hideInfo();
        game.displayAnimation(this.choice, computer.choice);


      };
    }
  }

  //computer chooses rock, scissors, or paper
  getComputerInput() {
    let randomNum = Math.floor(Math.random() * 3 + 1);

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
}

class Game {

  constructor(round) {
    this.round = 1;
    this.animDone = false;
    this.gamePics = [
      'img/paper.png',
      'img/rock.png',
      'img/scissors.png'
    ];
  }

  compareInput() {


    let gameInterval = setInterval(() => {

    if (this.animDone == true) {
      switch (true){

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

      displayWinner(input){
        let span = document.querySelector(".g-winner");
        span.innerHTML = input;

      }

      displayScore(pscore,cscore){
        //set player's score to display in the span
        $('.p-score').html(pscore);
        //set computer's score to display in the span
        $('.c-score').html(cscore);
      }

      displayRound(round){

        $('.round').html(round);

      }

      displayAnimation(choice,compchoice){


        let img = document.querySelector(".p-anim");
        let img2 = document.querySelector(".c-anim");
        let input = choice;
        let input2 = compchoice;

        let counter = 0;

        let animInterval = setInterval(newPic, 700);
        let self = this;

        function newPic(){
          //let pic1 = Math.floor(Math.random() * (3 - 0)) + 0;
          //let pic2 = Math.floor(Math.random() * (3 - 0)) + 0;
          $('.p-anim, .c-anim').effect('shake', {direction:"up"}, {distance:30}, {times:3});
          img.src = self.gamePics[1];
          img2.src = self.gamePics[1];

          counter += 1;
          //debugger;
          if (counter == 3){
            //set the final choice here

            let [first, second] = self.lastAnimPic(input,input2);

            console.log(first,second,"test");
            img.src = game.gamePics[first];
            img2.src = game.gamePics[second];
            game.animDone = true;

            clearInterval(animInterval);

          }

        }

      }

      lastAnimPic(choice1,choice2) {
        //get poses of choice 1 and 2 in pics arr
        let idxs = [];


        for (let i = 0, len = this.gamePics.length; i < len; i++){

          //
          if (choice1 == choice2 && this.gamePics[i].indexOf(choice1) != -1){
            idxs[0] = i;
            idxs[1] = i;

          } else if (this.gamePics[i].indexOf(choice2) != -1){
            idxs[1] = i;


          } else if (this.gamePics[i].indexOf(choice1) != -1 ){
            idxs[0] = i;

          }
        }

          return idxs;

      }

      hideInfo(){
        $('.choices, .scores').fadeOut();

      }

      init(){
        //player gives choice
        player.getPlayerInput();
        //computer gives choice
        computer.getComputerInput();
        //choices are compared
        game.compareInput();
        //fade out winner/loser divs
        $('.winner, .loser').fadeOut();
      }

      newRound(){

        $('.choices, .scores').fadeIn();

        player.getPlayerInput();
        //computer gives choice
        computer.getComputerInput();
        //choices are compared
        game.compareInput();
      }

      checkWinner(pscore,cscore){

        if (pscore === 3) {
          $('.winlose').html("You are the final game winner!");
          $('.winner').fadeIn();
        } else if (cscore === 3){
          $('.winlose').html("The computer is the final game winner!");
          $('.loser').fadeIn();
        }

        $('.instruct').fadeOut();
      }

  //points are added to respective player

  //another round starts

  //repeat until one player wins most of 3
}

let game = new Game();
let player = new Player();
let computer = new Player();



game.init();
})();

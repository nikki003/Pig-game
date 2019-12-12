/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, sixes, totalScore;
var diceDOM1, diceDOM2;

diceDOM1 = document.getElementById('dice-1');
diceDOM2 = document.getElementById('dice-2');

init();


//dice = Math.ceil(Math.random() * 6);

//document.querySelector('#current-' + activePlayer).textContent = dice;

diceDOM1.style.display = 'none';
diceDOM2.style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function(){

  if(gamePlaying){
  //Generate random number
  var dice1 = Math.ceil(Math.random() * 6);
  var dice2 = Math.ceil(Math.random() * 6);



  //display the Dice
  diceDOM1.style.display = 'block';
  diceDOM2.style.display = 'block';

  diceDOM1.src = 'dice-' + dice1 + '.png';
  diceDOM2.src = 'dice-' + dice2 + '.png';

  //update the roundscore of the current active player until 1 comes
  var roundScoreDOM = document.querySelector('#current-' + activePlayer);

  if (dice1 !== 1 && dice2 !== 1) {
    roundScore += dice1 + dice2;
    roundScoreDOM.textContent = roundScore;
  }
  else {
      roundScore = 0;
      roundScoreDOM.textContent = 0;
      changeActivePlayer();
    }
  }
})


document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
  //add the roundscores to the total scores when clicked this button and change the active players
  var scoreDOM = document.querySelector('#score-' + activePlayer);
  scores[activePlayer] += roundScore;
  scoreDOM.textContent = scores[activePlayer];

  totalScore = document.querySelector('.set-score').value;
  if(totalScore){
    var winningScore = totalScore;
  }
  else {
    winningScore = 100;
  }

  if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';

    gamePlaying = false;
  }

  else {
    changeActivePlayer();
  }
}
})


document.querySelector('.btn-new').addEventListener('click', init)


function init() {

  gamePlaying = true;
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  sixes = 0;

  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;

  diceDOM1.style.display = 'none';
  diceDOM2.style.display = 'none';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

}


function changeActivePlayer(){
  if (activePlayer === 0) {
    activePlayer = 1;
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
  }
  else {
    activePlayer = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

  }
  roundScore = 0;

  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

}

/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var score, roundScore, activePlayer, gamePlaying;
var diceDom = document.querySelector('.dice');
var score0 = document.getElementById('score-0');
var score1 = document.getElementById('score-1');
var current0 = document.getElementById('current-0');
var current1 = document.getElementById('current-1');


init();


document.querySelector('.btn-roll').addEventListener('click',() => {
    if(gamePlaying) {
        //get random number between 1 and 6
        var dice = Math.floor(Math.random() * 6) + 1;

        //display the dice
        diceDom.style.display = 'block';
        diceDom.src = `dice-${dice}.png`;

        //update the curent scores
        
        if(dice !== 1) {
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        
        } else {
            nextPlayer();
        }
    }
    
    
})

document.querySelector('.btn-hold').addEventListener('click', () => {
    if(gamePlaying) {
        //update the global score
        score[activePlayer] += roundScore;

        //update the UI
        document.querySelector(`#score-${activePlayer}`).textContent = score[activePlayer];


        var input = document.querySelector('.setScore').value;
        var winningScore;

        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }


        //know if the player wins
        if (score[activePlayer] >= winningScore) {
            document.querySelector(`#name-${activePlayer}`).textContent = "WINNER!!!";
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            diceDom.style.display = 'none';
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
    

})

document.querySelector('.btn-new').addEventListener('click', init)

const nextPlayer = () => {
    activePlayer === 0 ? (activePlayer = 1) : activePlayer = 0;
    roundScore = 0;
    current0.textContent = '0';
    current1.textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDom.style.display = 'none';
}

function init() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    diceDom.style.display = 'none';
    score0.textContent = '0';
    score1.textContent = '0';
    current0.textContent = '0';
    current1.textContent = '0';
    document.querySelector(`#name-0`).textContent = "Player 1";
    document.querySelector(`#name-1`).textContent = "Player 2";
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
}

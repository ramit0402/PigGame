/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, gamePlaying, prevScores;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        var dice, diceDOM;
        //1. Random Number
        dice = Math.ceil(Math.random() * 6);
        if(dice === 6 && prevScores[activePlayer] === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();

        } else {
            prevScores[activePlayer] = dice;
            //2. Display Result
            document.getElementById('dice').style.display = 'block';
            document.getElementById('dice').src = 'dice-' + dice + '.png';

            //3. Update the round score if the rolled number was not 1
            if(dice !== 1) {
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Add current score to globa score
        scores[activePlayer] += roundScore;


        //2. update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        
        if(!input) {
            input = 20;
        }

        //3. Check if player won the game
        if(scores[activePlayer] >= input) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!!';
            document.getElementById('dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //4. Next Player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', function() {
    init();
});

function nextPlayer() {
    roundScore = 0;
    activePlayer === 0? activePlayer = 1 : activePlayer = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.getElementById('dice').style.display = 'none';
}
    
function init() {
    scores = [0, 0];
    prevScores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}
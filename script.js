'use strict';
//Loader initial page load stage
window.addEventListener('DOMContentLoaded', () => {
    //Show loading screen
    const gameLoad = () => {
        loader.style.cssText = 'display: none';
    }
    setTimeout(gameLoad, 1200);
    //Variables
    const player0El = document.querySelector('.player--0');
    const player1El = document.querySelector('.player--1');
    const score0El = document.querySelector('#score--0');
    const score1El = document.querySelector('#score--1');
    const diceEl = document.querySelector('.dice');
    const gameOverEl = document.querySelector('.gameOver-title');
    const loader = document.querySelector('#loaderDiv');
    //Text content for the game
    let gameOverTxt = `GOOD JOB` + '<br>' + `That was awesome!`;
    //Initial state
    const scores = [0, 0];
    let currentScore = 0;
    let activePlayer = 0;
    let playState = true;
    let minHold = 0;
    let resetGame = () => {
        window.location.reload();
    }
    //Buttons
    const btnNew = document.querySelector('.btn--new');
    const btnRoll = document.querySelector('.btn--roll');
    const btnHold = document.querySelector('.btn--hold');
    //Starting conditions
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
    //Switch player function
    const switchPlayer = () => {
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');

    }
    //Rolling the dice function
    btnRoll.addEventListener('click', () => {
        if (playState) {
            //1. Generate a random dice roll
            const dice = Math.trunc(Math.random() * 6) + 1;
            //2. Display the dice
            diceEl.classList.remove('hidden');
            diceEl.src = `dice-${dice}.png`;
            //3. Check for rolled 1: if true > next player
            if (dice !== 1) {
                //Add dice to current score
                currentScore += dice;
                document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            }
            else {
                //if true > next player
                switchPlayer();
            }
        }
    });
    btnHold.addEventListener('click', () => {
        if (playState) {
            //1. Add current score to active players score
            scores[activePlayer] += currentScore;
            document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
            //2. Check if players score is >= 100
            if (scores[activePlayer] >= 100) {
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
                diceEl.classList.add('hidden');
                //Finish the game
                playState = false;
                document.querySelector('.player').classList.add('gameOver');
                gameOverEl.innerHTML = gameOverTxt;
            }
            //Switch to next player
            switchPlayer();
        }
    });
    //Reset the game
    btnNew.addEventListener('click', resetGame);
});


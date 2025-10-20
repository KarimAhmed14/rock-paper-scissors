localStorage.removeItem('score');

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
}

function updateGameResult(result) {
    if(result === 'You Win') {
        score.wins += 1;
    }
    if(result === 'You Lose') {
        score.losses += 1;
    }
    if(result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreDisplay();
}


function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';
    
    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        } else if (computerMove === 'paper') {
            result = 'You Lose';
        } else if (computerMove === 'scissors') {
            result = 'You Win';
        }
    }

    if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You Win';
        } else if (computerMove === 'paper') {
            result = 'Tie';
        } else if (computerMove === 'scissors') {
            result = 'You Lose';
        }
    }

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You Lose';
        } else if (computerMove === 'paper') {
            result = 'You Win';
        } else if (computerMove === 'scissors') {
            result = 'Tie';
        }
    }

    updateGameResult(result);
    return { result, computerMove };
}

document.querySelector('.rock').addEventListener('click', () => {
    const { result, computerMove } = playGame('rock');
    updateDOM(result, computerMove, 'rock');
});

document.querySelector('.paper').addEventListener('click', () => {
    const { result, computerMove } = playGame('paper');
    updateDOM(result, computerMove, 'paper');
});

document.querySelector('.scissors').addEventListener('click', () => {
    const { result, computerMove } = playGame('scissors');
    updateDOM(result, computerMove, 'scissors');
});

function updateDOM(result, computerMove, playerMove) {
    document.querySelector('.js-computer-pick').innerHTML = `
    <p>Computer picked: <img src="images/${computerMove}-emoji.png" alt=""></p>
    `;
    document.querySelector('.js-result').innerHTML = `
     <p>${result}</p>
    `;
    document.querySelector('.js-user-pick').innerHTML = `
    <p>You picked: <img src="images/${playerMove}-emoji.png" alt="${playerMove}"></p>
    `;
};

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1 / 3 ) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
};

function updateScoreDisplay() {
    document.querySelector('.js-score').innerHTML = `
        Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
    `;
}

updateScoreDisplay();

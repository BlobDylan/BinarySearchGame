let sortedArray = [];
let target;
let low, high;
let maxGuesses;
let remainingGuesses;

function startGame() {
    // Create a sorted array from 1 to 100
    sortedArray = Array.from({ length: 100 }, (_, i) => i + 1);

    // Pick a random target from the array
    target = sortedArray[Math.floor(Math.random() * sortedArray.length)];

    // Initialize low and high pointers
    low = 0;
    high = sortedArray.length - 1;

    // Calculate the maximum number of guesses needed (ceil(log2(100)))
    maxGuesses = Math.ceil(Math.log2(sortedArray.length));
    remainingGuesses = maxGuesses;

    // Generate the grid
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    for (let i = 0; i < sortedArray.length; i++) {
        const box = document.createElement('div');
        box.classList.add('grid-item');
        box.textContent = sortedArray[i];
        box.addEventListener('click', handleBoxClick);
        gameArea.appendChild(box);
    }

    document.getElementById('feedback').textContent = "Make your guess!";
    document.getElementById('remaining-guesses').textContent = `Remaining guesses: ${remainingGuesses}`;
}

function handleBoxClick(event) {
    const box = event.target;
    const guess = parseInt(box.textContent);
    makeGuess(guess, box);
}

function makeGuess(guess, box) {
    if (remainingGuesses <= 0) {
        document.getElementById('feedback').textContent = "No more guesses left! Start a new game.";
        return;
    }

    remainingGuesses--;
    document.getElementById('remaining-guesses').textContent = `Remaining guesses: ${remainingGuesses}`;

    if (guess === target) {
        box.classList.add('correct');
        document.getElementById('feedback').textContent = "Correct! You found the number!";
        removeAllClickListeners();
        return;
    }

    if (guess < target) {
        low = sortedArray.indexOf(guess) + 1;
        document.getElementById('feedback').textContent = `The number is higher than ${guess}.`;
    } else {
        high = sortedArray.indexOf(guess) - 1;
        document.getElementById('feedback').textContent = `The number is lower than ${guess}.`;
    }

    // Highlight the ruled-out options and disable their click event
    for (let i = 0; i < sortedArray.length; i++) {
        const currentBox = document.getElementsByClassName('grid-item')[i];
        if (i < low || i > high) {
            currentBox.classList.add('wrong');
            currentBox.removeEventListener('click', handleBoxClick);
        } else {
            currentBox.classList.remove('wrong');
        }
    }

    if (remainingGuesses <= 0 && guess !== target) {
        document.getElementById('feedback').textContent = `No more guesses left! The correct number was ${target}. Start a new game.`;
        removeAllClickListeners();
    }
}

function removeAllClickListeners() {
    const boxes = document.getElementsByClassName('grid-item');
    for (const box of boxes) {
        box.removeEventListener('click', handleBoxClick);
    }
}

// Start the game on page load
startGame();

const hangmanImage = document.querySelector('.hangman-box img');
const wordDisplay = document.querySelector('.word-display');
const guessesText = document.querySelector('.guesses-text b');
const keyboardDiv = document.querySelector('.keyboard');
const gameModal = document.querySelector('.game-modal');
const playAgainBtn = document.querySelector('.play-again');
const isLang = document.getElementById('isLang');

isLang.addEventListener('click', () => (isLang.textContent = 'RU'));

let currentWord;
let correctLetters;
let wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
	correctLetters = [];
	wrongGuessCount = 0;
	hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
	guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
	keyboardDiv.querySelectorAll('button').forEach(btn => (btn.disabled = false));
	wordDisplay.innerHTML = currentWord
		.split('')
		.map(() => `<li class="letter"></li>`)
		.join('');
	gameModal.classList.remove('show');
};

const getRandomWord = () => {
	const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
	let gold = word;
	currentWord = gold.toUpperCase();
	console.log(currentWord);
	document.querySelector('.hint-text b').innerText = hint;
	resetGame();
};

const gameOver = isVictory => {
	setTimeout(() => {
		const modalText = isVictory
			? `Ты нашел это слово:`
			: `Правильное слово было:`;
		gameModal.querySelector('img').src = `img/${
			isVictory ? 'victory' : 'lost'
		}.gif`;
		gameModal.querySelector('h4').innerText = `${
			isVictory ? 'Поздравляю!' : 'Игра закончена!'
		}`;
		gameModal.querySelector(
			'p'
		).innerHTML = `${modalText} <b>${currentWord}</b>`;
		gameModal.classList.add('show');
	}, 500);
};

const initGame = (button, clickKedLetter) => {
	if (currentWord.includes(clickKedLetter)) {
		[...currentWord].forEach((letter, index) => {
			if (letter === clickKedLetter) {
				correctLetters.push(letter);
				wordDisplay.querySelectorAll('li')[index].innerText = letter;
				wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
			}
		});
	} else {
		wrongGuessCount++;
		hangmanImage.src = `img/hangman-${wrongGuessCount}.svg`;
	}

	button.disabled = true;
	guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;

	if (wrongGuessCount === maxGuesses) return gameOver(false);
	if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 1040; i <= 1071; i++) {
	const button = document.createElement('button');
	button.innerText = String.fromCharCode(i);
	keyboardDiv.appendChild(button);
	button.addEventListener('click', e =>
		initGame(e.target, String.fromCharCode(i))
	);
}

getRandomWord();
playAgainBtn.addEventListener('click', getRandomWord);

// DOM to variable
var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');

var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');

var winnerTable = document.getElementById('js-winnerTable');
var winnerBoard = document.getElementById('js-winnerBoard');

// buttons preparate
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock');
pickRock.addEventListener('click', function () {
	playerPick(possiblePicks[0])
});

var pickPaper = document.getElementById('js-playerPick_paper');
pickPaper.addEventListener('click', function () {
	playerPick(possiblePicks[1])
});

var pickScissors = document.getElementById('js-playerPick_scissors');
pickScissors.addEventListener('click', function () {
	playerPick(possiblePicks[2])
});

// initiate
var gameState = 'notStarted'; //started // ended
var possiblePicks = ['kamień', 'papier', 'nożyce'];
var winnerName = ""; //*
var player = {
	name: '',
	score: 0
};
var computer = {
	score: 0
};

setGameElements();

// functions
function setGameElements() {
	switch (gameState) {
	case 'started':
		newGameElem.style.display = 'none';
		winnerTable.style.display = 'none'; //*
		pickElem.style.display = 'block';
		resultsElem.style.display = 'block';
		break;

	case 'ended':
		winnerBoard.innerText = "Wygrał " + winnerName; //*
		winnerTable.style.display = 'block'; //*
		newGameBtn.innerText = 'Jeszcze raz';

	case 'notStarted':

	default:
		newGameElem.style.display = 'block';
		pickElem.style.display = 'none';
		resultsElem.style.display = 'none';
	}
}

function newGame() {
	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
	if (player.name) { // czy powyższy wiersz nie implikuje powstania tej zmiennej w kazdym wypadku ?
		player.score = 0;
		computer.score = 0;
		gameState = 'started';
		winnerName = ''; //*
		setGameElements();
		playerNameElem.innerHTML = player.name;
		setGamePoints();
	}
}

function playerPick(playerPick) { // and computer also!
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
	checkGlobalWinner();
}

function getComputerPick() {
	return possiblePicks[Math.floor(Math.random() * 3)];
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player'; // domyślny!

	if (playerPick == computerPick) {
		winnerIs = 'noone'; // remis
	} else if (
		(computerPick == possiblePicks[0] && playerPick == possiblePicks[1]) ||
		(computerPick == possiblePicks[1] && playerPick == possiblePicks[2]) ||
		(computerPick == possiblePicks[2] && playerPick == possiblePicks[0])) {
		winnerIs = 'computer';

		computerResultElem.innerHTML = "Wygrana!";
		computer.score++;
	} else {
		playerResultElem.innerHTML = "Wygrana!";
		player.score++;
	}

//
setGamePoints(); // a aktualizacje zjadł pies ?, dodałem...
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function checkGlobalWinner() {
	if (player.score > 9) {
		winnerName = player.name;
	}

	if (computer.score > 9) {
		winnerName = "computer";
	}
	
	if (winnerName) {
		gameState = 'ended';
		setGameElements();
	}
}

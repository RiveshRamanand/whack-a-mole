console.log('main loaded');
const minimumTime = 500;
const maximumTime = 1250;
//laat de min max zien van wanneer de active tile switch
let playerPoints = 10;
let gameStarted = false;
let timerId;
//allemaal variable

const playerPointsElement = document.querySelector('.player-points');
const endGameButton = document.querySelector('.end-game-button');
const startGameButton = document.querySelector('.start-game-button');
///haalt de element op in javascript 

const allTiles = document.querySelectorAll('.tile');
console.log(allTiles);
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(getRandomNumber(1, 50));
///geeft een random number tussen de 1 en 50 

startGameButton.addEventListener('click', function(){
    startGameButton.disabled = true;
    endGameButton.disabled = false;
    if (!gameStarted){
        startGame();
    }
    gameStarted = true  ;
});
///luistert als je klik op de start knop en start het spel


endGameButton.addEventListener('click', function(){
    endGameButton.disabled = true;
    startGameButton.disabled = false;
    if (gameStarted){
        endGame();
    }
    gameEnd = true  ;
});
///beeindigt het spel na het klikken van de stop knop


function tileClicked(tile) {
    if (tile.classList.contains('active')) {
        playerPoints = playerPoints + 4;
    } else {
        playerPoints = playerPoints - 2;
    }
    if(playerPoints <= 0){
        endGame();
    }
    console.log(playerPoints);
    tile.classList.remove('active');
    playerPointsElement.textContent = playerPoints;
}
///geeft hoeveelheid punten aan als je op de mole klik zelfde geld voor als je misklikt


function activateRandomTile() {
    const currentActiveTile = document.querySelector('.tile.active');
    if (currentActiveTile) {
        currentActiveTile.classList.remove('active');

    }
    let randomTileNumber = getRandomNumber(0, allTiles.length - 1);
    const selectedTile = allTiles[randomTileNumber];
    selectedTile.classList.add('active');
    startGame();

};
///laat een random tile activeren 
allTiles.forEach(function (tile) {
    tile.addEventListener('click', function () {
        if(gameStarted){
            tileClicked(tile);
        }
        
    })
});
///laat de tiles activeren nadat je op start klikt
function startGame() {
    const randomTime = getRandomNumber(minimumTime, maximumTime);

    timerId = setTimeout(activateRandomTile, randomTime);
}
///geeft een random tijd aan voor de tiles wanneer je het spel start
function endGame(){
    gameStarted = false;
    startGameButton.disabled = false;
    clearInterval(timerId);
    clearTiles();
}
///maakt de button endgame functioneel
function clearTiles(){
    for(let i = 0; i < allTiles.length; i++){
        const tileElement = allTiles[i];
        tileElement.classList.remove('active');
    }
}
///cleared de tile als het spel beeindigt



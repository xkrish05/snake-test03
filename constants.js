const CELL_SIZE = 100;
const COLUMNS = 7;
const ROWS = 12.02;
const GAME = {
    width: COLUMNS * CELL_SIZE,
    height: ROWS * CELL_SIZE,
    gameOver: false,
    loop: 0,
}

function resetGame(){
    GAME.gameOver = false;
    Snake.reset();
    Food.reset();

}
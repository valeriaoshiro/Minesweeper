/*----- app's state (variables) -----*/
var board, randomBombs;

/*----- cached element references -----*/
var squares = document.querySelectorAll('td');

/*----- event listeners -----*/
document.querySelector('tbody').addEventListener('click', handleSquareClick);
document.querySelector('button').addEventListener('button', init);

/*----- functions -----*/
init();

function init(){
    squares.forEach(function(el){
        el.classList.remove('clicked');
        el.classList.add('unclicked');
    });
    board = [];
    for(var i = 0; i < 64; i++){
        board[i] = null;
    }
    randomBombs = [];
    for(var i = 0; i < 10; i++){
        randomBombs.push(Math.floor(Math.random()*64));
    }
    console.log(randomBombs);
    randomBombs.forEach(function(el){
        board[el] = 'bomb';
    });
    console.log(board);
}

function handleSquareClick(evt){
    evt.target.classList.remove('unclicked');
    evt.target.classList.add('clicked');
}

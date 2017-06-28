$(function(){

/*----- app's state (variables) -----*/
var board, randomBombs, xcoor, ycoor;

/*----- cached element references -----*/
var squares = document.querySelectorAll('td');

/*----- event listeners -----*/
document.querySelector('tbody').addEventListener('click', handleSquareClick);
document.querySelector('button').addEventListener('click', init);

/*----- functions -----*/
init();

function init(){
    // Makes the square dark gray and clears all the bomb icons
    squares.forEach(function(el){
        el.classList.remove('clicked');
        el.classList.add('unclicked');
        el.innerHTML = '';
    });
    // Create an array with 10 indexes where the bombs are going
    randomBombs = [];
    for(var i = 0; i < 10; i++){
        var random = Math.floor(Math.random()*64);
        if(!randomBombs.includes(random)){
            randomBombs.push(random);
        } else {
            i--;
        }
    }
    // Create the array object with display false, its coordinate, and value of bomb
    board = [];
    xcoor = ycoor = 0;
    for(var i = 0; i < 64; i++){
        var eachSquare = {
            display: false,
            coor: {x: xcoor, y: ycoor}
        };
        board.push(eachSquare);
        xcoor++;
        if(xcoor > 7){
            ycoor++;
            xcoor = 0;
        }
    }
    console.log(randomBombs);
    randomBombs.forEach(function(el){
        board[el].value = 'bomb';
    });
    checkNumberValue();
    console.log(board);
    render();
}

function checkNumberValue(){
    board.forEach(function(square){
        var numberOfBombs = 0;
        if(!square.hasOwnProperty('value')){
            xcoor = square.coor.x;
            ycoor = square.coor.y;
            var tempx, tempy;
            // upper left
            tempx = xcoor - 1;
            tempy = ycoor - 1;
            for(var i = 0; i < 64; i++){
                if(board[i].coor.x === tempx && board[i].coor.y === tempy){
                    if (board[i].value === 'bomb') numberOfBombs++;
                }
            } 
            // upper middle
            tempx = xcoor;
            tempy = ycoor - 1;
            for(var i = 0; i < 64; i++){
                if(board[i].coor.x === tempx && board[i].coor.y === tempy){
                    if (board[i].value === 'bomb') numberOfBombs++;
                }
            }
            // upper right
            tempx = xcoor + 1;
            tempy = ycoor - 1;
            for(var i = 0; i < 64; i++){
                if(board[i].coor.x === tempx && board[i].coor.y === tempy){
                    if (board[i].value === 'bomb') numberOfBombs++;
                }
            }
            // middle right
            tempx = xcoor + 1;
            tempy = ycoor;
            for(var i = 0; i < 64; i++){
                if(board[i].coor.x === tempx && board[i].coor.y === tempy){
                    if (board[i].value === 'bomb') numberOfBombs++;
                }
            }
            // lower right
            tempx = xcoor + 1;
            tempy = ycoor + 1;
            for(var i = 0; i < 64; i++){
                if(board[i].coor.x === tempx && board[i].coor.y === tempy){
                    if (board[i].value === 'bomb') numberOfBombs++;
                }
            }
            // lower middle
            tempx = xcoor;
            tempy = ycoor + 1;
            for(var i = 0; i < 64; i++){
                if(board[i].coor.x === tempx && board[i].coor.y === tempy){
                    if (board[i].value === 'bomb') numberOfBombs++;
                }
            }
            // lower left
            tempx = xcoor - 1;
            tempy = ycoor + 1;
            for(var i = 0; i < 64; i++){
                if(board[i].coor.x === tempx && board[i].coor.y === tempy){
                    if (board[i].value === 'bomb') numberOfBombs++;
                }
            }
            // middle left
            tempx = xcoor - 1;
            tempy = ycoor;
            for(var i = 0; i < 64; i++){
                if(board[i].coor.x === tempx && board[i].coor.y === tempy){
                    if (board[i].value === 'bomb') numberOfBombs++;
                }
            }
            square.value = numberOfBombs;   
        }
    });
}

function handleSquareClick(evt){
    evt.target.classList.remove('unclicked');
    evt.target.classList.add('clicked');
}

function render(){
    board.forEach(function(el, index){
        if(el.value === 'bomb'){
            squares[index].innerHTML = '<i class="fa fa-bomb" aria-hidden="true"></i>';
        } else if (!el.value) {
            squares[index].textContent = '';
        } else {
            squares[index].textContent = el.value;
        } 
    });
}


});

/*
Flag
<i class="fa fa-flag" aria-hidden="true"></i>
Question mark
<i class="fa fa-question" aria-hidden="true"></i>
*/
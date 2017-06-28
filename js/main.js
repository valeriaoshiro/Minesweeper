$(function(){

/*----- app's state (variables) -----*/
var board, randomBombs, xcoor, ycoor;

/*----- cached element references -----*/
var $squares = $('td');
var $body = $('body');

/*----- event listeners -----*/
$('tbody').on('click', handleSquareClick);
$('button').on('click', init);

/*----- functions -----*/
init();

function init(){
    // Makes the square dark gray and clears all the bomb icons
    $squares.addClass('unclicked').removeClass('clicked').html('');
    
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
    randomBombs.forEach(function(el){
        board[el].value = 'bomb';
    });
    checkNumberValue();
    $body.css({background: 'white'});

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
    $(evt.target).removeClass('unclicked').addClass('clicked');
    board[evt.target.id].display = true;
    render();
}

function render(){
    board.forEach(function(el, index){
        if(el.display){
            if(el.value === 'bomb'){ // it the user clicks on the bomb, it will show all the bombs
                randomBombs.forEach(function(el){
                    $squares.eq(el).html('<i class="fa fa-bomb" aria-hidden="true"></i>');
                });
                
            } else if (!el.value) {
                $squares.eq(index).text('');
            } else {
                $squares.eq(index).text(el.value);
            } 
       }
        
        // if the user clicks on the bomb, it will turn the background red
        if(el.display && el.value === 'bomb'){
            $body.css({background: 'red'});
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

/*
 if(el.value === 'bomb'){
            $squares.eq(index).html('<i class="fa fa-bomb" aria-hidden="true"></i>');
        } else if (!el.value) {
            $squares.eq(index).text('');
        } else {
            $squares.eq(index).text(el.value);
        } 
        */
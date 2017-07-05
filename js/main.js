$(function(){

/*----- app's state (variables) -----*/
var board, randomBombs, xcoor, ycoor, sumOfWinningSquares, tdDisplayContent, bombsLeft, timePassed, firstClick, timerId;

/*----- cached element references -----*/
var $squares = $('td');
var $body = $('body');
var $resetButton = $('#resetButton');
var $bombsLeftDisplay = $('#bombsLeft');
var $timePassedDisplay = $('#timePassed');

/*----- event listeners -----*/
$resetButton.on('click', handleResetClick);

/*----- functions -----*/
init();

function init(){
    $('tbody').on('click', 'td', handleSquareClick);

    $body.css({background: 'white'});
    sumOfWinningSquares = 0;
    tdDisplayContent = '';
    bombsLeft = 10;
    timePassed = 0;
    firstClick = true;
    $timePassedDisplay.val(timePassed);

    // Makes the square dark gray and clears all the bomb icons
    $squares.addClass('unclicked').removeClass('clicked').html('');

    // Reset button will be a happy face
    $resetButton.html('<i class="fa fa-smile-o" aria-hidden="true"></i>');

    // Create an array with 10 indexes where the bombs are going
    randomBombs = [];
    for(var i = 0; i < 10; i++){
        var random = Math.floor(Math.random() * 64);
        if(!randomBombs.includes(random)){      // if the array doesn't have the same numbere, push
            randomBombs.push(random);
        } else {                                // else, decrease i to get a new number
            i--;
        }
    }
    // Create the array that holds objects with display false and its coordinate
    board = [];
    xcoor = ycoor = 0;
    for(var i = 0; i < 64; i++){
        var square = {
            display: false,
            coor: {x: xcoor, y: ycoor}
        };
        board.push(square);
        xcoor++;
        if(xcoor > 7){
            ycoor++;
            xcoor = 0;
        }
    }
    
    // Add the value of bomb to the board
    randomBombs.forEach(function(el){
        board[el].value = 'bomb';
    });

    // Add the number of surrounding bombs
    addNumberValue();

    render();
}

function addNumberValue(){
    board.forEach(function(square){
        var numberOfBombs = 0;
        if(!square.hasOwnProperty('value')){    // if the square is empty add a number
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
    // if it's the first click, start counter
    if(firstClick) { 
        firstClick = false;
        timerId = setInterval(countTimer, 1000);
    }    

    
    if (evt.shiftKey) {         // if shift+click
        tdDisplayContent = evt.currentTarget;
    } else {                    // else regular click
        if(evt.currentTarget.innerHTML === ''){ // if it doesn't have a flag on square, continue (cannot open a square if it has a flag)
            openArea(board[evt.target.id].coor.x, board[evt.target.id].coor.y);
        }
    }

    render();
}

function handleResetClick(evt){
    $('tbody').off('click', 'td', handleSquareClick);
    clearInterval(timerId);
    init();
}

function render(){
    board.forEach(function(el, index){
        if(el.display){
            if(el.value === 'bomb'){            // if the user clicks on the bomb, it will show all the bombs
                randomBombs.forEach(function(el){
                    $squares.eq(el).html('<i class="fa fa-bomb" aria-hidden="true"></i>');
                });
                $body.css({background: '#ff6961'});
                $resetButton.html('');
                $resetButton.html('<i class="fa fa-frown-o" aria-hidden="true"></i>');
                $('tbody').off('click', 'td', handleSquareClick);
                clearInterval(timerId);
            } else if (!el.value) {             // if the suer clicks on empty square, shows nothing
                $squares.eq(index).text('');
            } else {                            // else, show the number
                $squares.eq(index).text(el.value); 
            } 
            $squares.eq(index).addClass('clicked').removeClass('unclicked');
       }
    });

    // checks if the user has shift+clicked. If so, it toggles between flag or empty
    if(tdDisplayContent) {
        if(tdDisplayContent.innerHTML === ''){
            bombsLeft--;
            tdDisplayContent.innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>';
        } else {
            tdDisplayContent.innerHTML = '';
            bombsLeft++;
        }
        tdDisplayContent = '';
    }
    
    // update the number of bombs left
    $bombsLeftDisplay.val(bombsLeft);

    checkWinner();
    if(sumOfWinningSquares === 54){
        $body.css({background: '#a0e7a0'});
        $resetButton.html('');
        $resetButton.html('<i class="fa fa-trophy" aria-hidden="true"></i>');
        $('tbody').off('click', 'td', handleSquareClick);
        clearInterval(timerId);
    }
}

function checkWinner(){
    sumOfWinningSquares = 0;
    board.forEach(function(el){
        if(el.display && el.value !== 'bomb'){
            sumOfWinningSquares++;
        }
    });
}

function openArea(x, y){
    board.forEach(function(square, idx){
        if(square.coor.x === x && square.coor.y === y) {
            // base case
            if(square.display){return;}                         // if it has already been clicked, return
            if($squares[idx].innerHTML){return;}                // if it has a flag, return
            if(square.value > 0 || square.value === 'bomb') {   // if it's a number or bomb, show it
                square.display = true;
                return;
            } else {                                            // else, it's an open space, check for adjacent spaces
                square.display = true;
                var tempxneg = x - 1;
                var tempyneg = y - 1;
                var tempxpos = x + 1;
                var tempypos = y + 1;
                openArea(tempxneg, tempyneg);   // upper left
                openArea(x, tempyneg);          // upper middle
                openArea(tempxpos, tempyneg);   // upper right
                openArea(tempxpos, y);          // middle right
                openArea(tempxpos, tempypos);   // lower right
                openArea(x, tempypos);          // lower middle
                openArea(tempxneg, tempypos);   // lower left
                openArea(tempxneg, y);          // middle left
                
            }
        } 
    });   
}

function countTimer(){
    ++timePassed;
    $timePassedDisplay.val(timePassed);
    if(timePassed === 999){     // if the user has run out of time, game over
        $body.css({background: '#ff6961'});
        $resetButton.html('');
        $resetButton.html('<i class="fa fa-frown-o" aria-hidden="true"></i>');
        $('tbody').off('click', 'td', handleSquareClick);
        clearInterval(timerId);
    }
}


});

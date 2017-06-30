$(function(){

/*----- app's state (variables) -----*/
var board, randomBombs, xcoor, ycoor, isWinner;

/*----- cached element references -----*/
var $squares = $('td');
var $body = $('body');
var $resetButton = $('button');

/*----- event listeners -----*/
$('tbody td').on('click', handleSquareClick);
$resetButton.on('click', init);

/*----- functions -----*/
init();

function init(){
    // Makes the square dark gray and clears all the bomb icons
    $squares.addClass('unclicked').removeClass('clicked').html('');

    // Reset button will be a happy face
    $resetButton.html('<i class="fa fa-smile-o" aria-hidden="true"></i>');
    
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
    isWinner = false;
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
    if (evt.shiftKey) {
        if(evt.currentTarget.innerHTML === ""){
            evt.currentTarget.innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>';
        } else if(evt.currentTarget.innerHTML === '<i class="fa fa-flag" aria-hidden="true"></i>'){
            evt.currentTarget.innerHTML = "";
            evt.currentTarget.innerHTML = '<i class="fa fa-question" aria-hidden="true"></i>';
        } else {
            evt.currentTarget.innerHTML = "";
        }

    } else {
        openArea(board[evt.target.id].coor.x, board[evt.target.id].coor.y);

    }
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
            $squares.eq(index).addClass('clicked').removeClass('unclicked');
       }
        
        // if the user clicks on the bomb, it will turn the background red, reset button will be sad
        if(el.display && el.value === 'bomb'){
            $body.css({background: 'red'});
            $resetButton.html('');
            $resetButton.html('<i class="fa fa-frown-o" aria-hidden="true"></i>');
        }
    });
    checkWinner();
    if(isWinner === 54){
        $body.css({background: 'green'});
        $resetButton.html('');
        $resetButton.html('<i class="fa fa-trophy" aria-hidden="true"></i>');
    }
}

function checkWinner(){
    board.forEach(function(el){
        if(el.display && el.value !== 'bomb'){
            isWinner++;
        }
    });
}

function openArea(x, y){
    board.forEach(function(square){
        // base case
        if(square.coor.x === x && square.coor.y === y) {
            if(square.display){return;}
            if(square.value > 0 || square.value === 'bomb') {
                square.display = true;
                return;
            } else {
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



});

/*
Flag
<i class="fa fa-flag" aria-hidden="true"></i>
Question mark
<i class="fa fa-question" aria-hidden="true"></i>
Happy face
<i class="fa fa-smile-o" aria-hidden="true"></i>
Sad face
<i class="fa fa-frown-o" aria-hidden="true"></i>
Trophy
<i class="fa fa-trophy" aria-hidden="true"></i>
*/
 
 // need to check if user has won, and display green background and trophy icon
/*----- app's state (variables) -----*/
var board, randomBombs;

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
    var xcoor = 0;
    var ycoor = 0;
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
    console.log(board);
    render();
}

function handleSquareClick(evt){
    evt.target.classList.remove('unclicked');
    evt.target.classList.add('clicked');
}

function render(){
    board.forEach(function(el, index){
        if(el.value === 'bomb'){
            squares[index].innerHTML = '<i class="fa fa-bomb" aria-hidden="true"></i>';
        }
    });
}
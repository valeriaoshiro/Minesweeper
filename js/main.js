/*----- app's state (variables) -----*/
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
}

function handleSquareClick(evt){
    evt.target.classList.remove('unclicked');
    evt.target.classList.add('clicked');
}

// Math.floor(Math.random()*63)
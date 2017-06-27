# Minesweeper Pseudocode

* Initialize state (data)
* Add event listeners to the board
* Render board
    * Board will be 8x8 with 10 bombs
    * Square can be empty unclicked
    * Square can be empty clicked
    * Square can be bomb
    * Square can be a number
* Wait for the user to click
    * if reset (happy face), then initialize
    * if click on a square 
        * if first time clicking - start timer
        * if empty - open other surrounding empty squares and numbers
        * if bomb - game over, change to sad face
        * if number - show number
    * if shift-click on a square
        * if empty - show flag, decrease bomb number
        * if has flag - show ?, increase bomb number
        * if has ? - show empty
* If more than 999 seconds has passed, game over, change to sad face
* Render board


## Variables
* display squares
    * 0 - un-click
    * 1 - empty clicked
    * 2 - bomb
    * 3 - number
    * 4 - flag
    * 5 - ?
* state of 
# Minesweeper Pseudocode

* Initialize state (data)
* Add event listeners to the board
* Render board
    * Board will be 8x8 with 10 bombs
* Wait for the user to click
    * if reset (happy face), then initialize
    * if click on a square
        * if diplay is true, do nothing
        * if display is false:
            * if first time clicking - start timer
            * if square is empty - open other surrounding empty squares and numbers
            * if square is bomb - game over, change to sad face
            * if square is number - show number
            * if all squares' display are true, and value are 0 or number, then player won
    * if shift-click on a square
        * if display is true, do nothing
        * if display is false:
            * if empty - show flag, decrease bomb number
            * if has flag - show ?, increase bomb number
            * if has ? - show empty
* If more than 999 seconds has passed, game over, change to sad face
* Render board


## Variables
* board (array)
    * contains object of each square 
        * display - false if not clicked, true if clicked
        * value - bomb, number, 0
        * coor - {x, y}
* randomBombs (array) - holds indexes where the bombs will be
* xcoor and ycoor
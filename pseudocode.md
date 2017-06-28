# Minesweeper Pseudocode

* Initialize state (data)
* Add event listeners to the board
* Render board
    * Board will be 8x8 with 10 bombs
* Wait for the user to click
    * if reset (happy face), then initialize
    * if click on a square
        * if diplay is clicked, do nothing
        * if display is unclicked:
            * if first time clicking - start timer
            * if state of board is empty - open other surrounding empty squares and numbers
            * if state of board is bomb - game over, change to sad face
            * if state of board is number - show number
    * if shift-click on a square
        * if display is clicked, do nothing
        * 
        * if empty - show flag, decrease bomb number
        * if has flag - show ?, increase bomb number
        * if has ? - show empty
* If more than 999 seconds has passed, game over, change to sad face
* Render board


## Variables
* board (array)
    * contains object of each square 
        * display - false if not clicked, true if clicked
        * value - bomb, number, null
        * coor - {x, y}
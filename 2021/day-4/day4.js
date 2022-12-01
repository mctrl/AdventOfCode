const helpers = require("../helpers/helpers.js");

(async () => {
    const test = 
`7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19`
    let input = await helpers.readInput(4);
    // let input = test;
    input = input.split("\n");
    function generateBoard(data) {

        let board = []
        const i = 0;
        sample = data.slice(0 , 5)
        do {
            const row = sample.shift().match(/(\d+)/g);
            board.push(row)
        } while (sample.length);

        return (data.length > 5 ) ? [board, ...generateBoard(data.splice(6, data.length))] : [board];

    }

    const isX = (square) => square === marker;

    function checkBoardsForWinner(boards) {        

        boards.forEach((board, i ) => {
            
            if (winningBoard.length > 0 || winningBoardNumbers.includes(i)) return false;

            for (let row = 0; row < board.length; row++) { 

                if (isRowWinner(board[row])) {
                    
                    winningBoardNumbers.push(i);
                    if (winningBoardNumbers.length === boards.length) {
                        winningBoard = board;
                    }
                    
                    return false;
                }
            }
            
            const inverted = transpose(board);

            for (let row = 0; row < inverted.length; row++) { 
                
                if (isRowWinner(inverted[row])) {
                    winningBoardNumbers.push(i);
                    if (winningBoardNumbers.length === boards.length) {
                        winningBoard = board;
                    }
                    
                    return false;
                }
            }

        })
    }



    const transpose = (matrix) => {
        let [row] = matrix
        return row.map((value, column) => matrix.map(row => row[column]))
      }

    const isRowWinner = slice => {
        const x = slice.filter(isX);
        const count =  x.length;
        return count === 5 ? true : false;
    }

    let winningBoardNumbers = [];
    i = 0;
    let lastNumber;
    const marker = 'X'
    let winningBoard = [];


    const bingoNumbers = input.shift().split(',');

    const arrayOfBoards = generateBoard(input.splice(1, input.length))

    bingoNumbers.forEach((number, i) => {

        if (winningBoard.length > 0) return false; 

        lastNumber = parseInt(number);
    
        arrayOfBoards.forEach(board => {
            for (let row = 0; row < board.length; row++) {
                for (let column = 0; column < board[row].length; column++) {
                    if (board[row][column] == lastNumber) {
                        board[row][column] = marker;
                    }
                }
            }
        })

        if ( i >= 4) checkBoardsForWinner(arrayOfBoards) 

    })
    
    const sumOfBoard = winningBoard.flat().reduce((sum, position) => {
        const toAdd = position === marker ? 0 : parseInt(position)
        return toAdd + sum;
    }, 0)

    console.log( sumOfBoard * lastNumber)

  })();
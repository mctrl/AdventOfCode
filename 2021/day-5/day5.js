const { SIGPWR } = require("constants");
const { resourceUsage } = require("process");
const helpers = require("../helpers/helpers.js");

(async () => {
    const test = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`
    let input = await helpers.readInput(5);
    // let input = test;
    input = input.split("\n");

    function addToGrid(firstCoord, secondCoord, pointer , horizontal = true) {

        const [start, end] = [firstCoord, secondCoord].sort((a, b) => a - b)

        if (horizontal) {

            // populate pointer row
            for (let index = start; index <= end; index++) {
               
                solutionGrid[pointer] = solutionGrid[pointer] || [];
                solutionGrid[pointer][index] = solutionGrid[pointer][index] || 0;
                solutionGrid[pointer][index] = solutionGrid[pointer][index] + 1;
            
            }
            
        } else {
             // 3,4 -> 1,4

            for (let index = start; index <= end; index++) {

                solutionGrid[index] = solutionGrid[index] || []
                solutionGrid[index][pointer] = solutionGrid[index][pointer] || 0
                solutionGrid[index][pointer] = solutionGrid[index][pointer] + 1;

            }
        }

    }

    const arrayOfCoordinates = input.map(line => line.split(' -> ').map(c => c.split(',').map(s => parseInt(s))));

    const x = 0;
    const y = 1;
    const first = 0;
    const second = 1;

    let solutionGrid =[];
    arrayOfCoordinates.forEach(pair => {

        if (pair[first][x] === pair[second][x]) {
            addToGrid(pair[first][y], pair[second][y], pair[first][x], false)
        } else if (pair[first][y] === pair[second][y]) {
            addToGrid(pair[first][x], pair[second][x], pair[first][y])
        } else {
            addDiagonally(pair[first], pair[second])
        }
    });

    function addDiagonally(firstCoord, secondCoord) {

        const [start, end] = [firstCoord, secondCoord].sort((a, b) => a[x] - b[x])
        let pointer = start[y];

        solutionGrid[pointer] = solutionGrid[pointer] || []
        solutionGrid[pointer][start[x]] = solutionGrid[pointer][start[x]] || 0
        solutionGrid[pointer][start[x]] = solutionGrid[pointer][start[x]] + 1;

        for (let column = start[x]+1; column <= end[x]; column++) {

            pointer = start[y] < end[y] ? pointer + 1 :  pointer - 1;

            solutionGrid[pointer] = solutionGrid[pointer] || []
            solutionGrid[pointer][column] = solutionGrid[pointer][column] || 0
            solutionGrid[pointer][column] = solutionGrid[pointer][column] + 1;

            

        }
    }

    const solutionNumbers = solutionGrid.flat().filter(n => {
        return n > 1;
    })
    console.log(solutionNumbers.length)

  })();
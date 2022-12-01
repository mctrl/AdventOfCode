const { SIGPWR } = require("constants");
const { inflate } = require("zlib");
const helpers = require("../helpers/helpers.js");

(async () => {
    const test = `2199943210
3987894921
9856789892
8767896789
9899965678`
    // let input = await helpers.readInput(9);
    let input = test;
    const silverStar = input.split("\n").flatMap((rowNumbers, row, allArray) => {
        // console.log('rowNumbers', rowNumbers, row);
        // console.log('ROW', row, '^^^^^^^^^^^^^^^^^^^^^')


        
        const numbers = [...rowNumbers].filter((number, column, rowArray) => {
            
            // const number = n;
            // console.log('-----------------------------')
            
            let columnPointer = column < rowArray.length - 1 ? rowArray[column+1] : null;
            
            const topRow = row !== 0 ? allArray[row-1] : [];
            const bottomRow = row < allArray.length - 1 ? allArray[row+1] : [];
            // console.log('topRow', topRow)
            // console.log('target', rowArray)
            // console.log('bottomRow', bottomRow)

            // console.log('checking for number on index',column, number, columnPointer)
            if (columnPointer !== null) {
                if ( number >= columnPointer ) return false;
                // console.log('number is < then next one on row',  number, columnPointer)
            }
            if (topRow.length) {
                // console.log('top column check', number, topRow[column],  number > topRow[column])
                if ( number >= topRow[column]) return false;
                // console.log('number is < then same on top row',  number, topRow[column])
            }
            if (bottomRow.length) {
                // console.log('bottom column check', number, bottomRow[column],  number >= bottomRow[column])
                if (  number >= bottomRow[column]) return false;
                // console.log('number is < then same on bottom row',  number, bottomRow[column])
            }
                
            columnPointer = column !== 0 ? rowArray[column-1] : null;

            if (columnPointer !== null) {
                // console.log('number is < then previous one on same row',  number, columnPointer, number >= columnPointer)
                if ( number >= columnPointer ) return false;
                // console.log('number is < then previous one on same row',  number, columnPointer)

            }

            // console.log('SELECTING', number)
                
            return number;

    
        })
        
        

        // console.log('numbers', numbers);

        return numbers;

    });

    const solution = silverStar.reduce((a, n) => {
        return parseInt(n) + parseInt(a) + 1;
    }, 0)

    console.log(solution)


    const coordinatesLowPoints = input.split("\n").map((rowNumbers, row, allArray) => {
                
        const numbers = [...rowNumbers].map((number, column, rowArray) => {
                        
            let columnPointer = column < rowArray.length - 1 ? rowArray[column+1] : null;
            
            const topRow = row !== 0 ? allArray[row-1] : [];
            const bottomRow = row < allArray.length - 1 ? allArray[row+1] : [];

            if (columnPointer !== null) {
                if ( number >= columnPointer ) return undefined;
            }
            if (topRow.length) {
                if ( number >= topRow[column]) return undefined;
            }
            if (bottomRow.length) {
                if (  number >= bottomRow[column]) return undefined;
            }
                
            columnPointer = column !== 0 ? rowArray[column-1] : null;

            if (columnPointer !== null) {
                if ( number >= columnPointer ) return undefined;

            }
            return column;

    
        }).filter(x => x);
        
        return numbers;
    })


    const delimitedInput = input.split("\n").map((rowNumbers) => {
        return rowNumbers.replace(/9/g, 'X')
    })

    let basin = [];

    coordinatesLowPoints.forEach((coordsPerRow, row) => {
        if (!coordsPerRow.length) return false;
        console.log('coordsPerRow', coordsPerRow);

        [...coordsPerRow].forEach((lowPointIndex) => {
            console.log('positionig myself at', row, lowPointIndex, delimitedInput[row][lowPointIndex])
            // basin.push(startBasin(row, lowPointIndex, 1))
            checkAdjacent(row, lowPointIndex, 1)
        })
    })

    // val allLocationsInBasin = mutableListOf<Pair<Int, Int>>()
    // data class BasinCounter(var count: Int = 0)

    // fun getBasin(matrix: Array<IntArray>, lowPoint: Pair<Int, Int>, counter: BasinCounter) {
    //     val rowSize = matrix.size
    //     val colSize = matrix[0].size
    
    //     for (direction in Direction.values()) {
    //         val currentLocation = matrix[lowPoint.first][lowPoint.second]
    //         val locFromDirection = getLocationBasedOnDirection(lowPoint.first,lowPoint.second, direction)
    //         val isLocValid = isLocationValid(locFromDirection.first,locFromDirection.second,rowSize, colSize)
    //         if (
    //             isLocValid
    //             && matrix[locFromDirection.first][locFromDirection.second] > currentLocation
    //             && matrix[locFromDirection.first][locFromDirection.second] != 9
    //             && !allLocationsInBasin.contains(locFromDirection)
    //         ){
    //             allLocationsInBasin.add(locFromDirection)
    //             counter.count = counter.count + 1
    //             getBasin(matrix,locFromDirection,counter)
    //         }
    //     }
    // }

    // val listOfBasins = mutableListOf<Int>()
    // // for each low point find basin
    // for (lowPoint in lowestPoints) {
    //     allLocationsInBasin.add(Pair(lowPoint.first, lowPoint.second))
    //     // every low point has a basin
    //     // The size of a basin is the number of locations within the basin,
    //     // including the low point. (count = 1) -> includes low point count
    //     val counter = BasinCounter()
    //     counter.count = 1
    //     getBasin(matrix = matrix, lowPoint = lowPoint, counter = counter)
    //     listOfBasins.add(counter.count)
    // }

    // listOfBasins.sortDescending()

    // return listOfBasins.take(3).reduce { acc, i -> acc * i }



    function checkAdjacent(row, column, sum) {
        const top;
        const bottom;
        const left;
        const right;

        console.log(row, column, sum)

    }

    console.log(coordinatesLowPoints, delimitedInput)


  })();
const helpers = require('../helpers/helpers.js');

// WIP solution not working with input
// needs Breadth-first search or --> Dijkstra <--  or A* probably
// path finding algorithm
// exploring the whole graph once

(async () => {
  const test = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

  // let input = await helpers.readInput(12);
  let input = test;
  input = input.split('\n');

  function findIndex(matrix, char) {
    for (let index = 0; index < matrix.length; index++) {
      const position = matrix[index].indexOf(char);
      if (position !== -1) {
        return position;
        break;
      }
    }
  }

  const heightSequence = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const directions = {
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
    T: { x: 0, y: -1 },
    B: { x: 0, y: 1 },
  };

  // find the coordinates to the starting point and the coordinates of the end point

  function silverStar(input) {
    const rowMatrix = input.map((l) => l.split(''));
    const columnMatrix = helpers.transposeMatrix(rowMatrix);
    const visitedMatrix = rowMatrix.map((l) => l.map((c) => false));

    const S = {
      x: findIndex(rowMatrix, 'S'),
      y: findIndex(columnMatrix, 'S'),
    };
    const E = {
      x: findIndex(rowMatrix, 'E'),
      y: findIndex(columnMatrix, 'E'),
    };
    // console.log(`starting point ${S.x},${S.y} last point ${E.x},${E.y}`);

    const possibleRoutes = [];

    function going(current, stepCount, path, matrix) {
      let ramification = 0;
      // console.log(
      //   `---------- Step ${stepCount} inspection sorrounding of ${current.letter} x: ${current.x} ${current.y} ${path}`
      // );
      for (const dir in directions) {
        if (Object.hasOwnProperty.call(directions, dir)) {
          let inspectedPoint = null;

          const inspectedX = current.x + directions[dir].x;
          const inspectedY = current.y + directions[dir].y;

          if (
            (!(inspectedX < 0) &&
              !(inspectedX >= matrix[0].length) &&
              (dir === 'R' || dir === 'L')) ||
            (!(inspectedY < 0) &&
              !(inspectedY >= matrix.length) &&
              (dir === 'T' || dir === 'B'))
          ) {
            inspectedPoint = matrix[inspectedY][inspectedX];
          }

          if (current.letter === 'z' && inspectedPoint === 'E') {
            // console.log('I arrived!', path, stepCount);
            // i arrived to the designated point

            return possibleRoutes.push({
              count: stepCount,
              hasReachedEnd: true,
            });
          }

          if (
            inspectedPoint &&
            (inspectedPoint === current.letter ||
              inspectedPoint ===
                heightSequence[heightSequence.indexOf(current.letter) + 1])
          ) {
            const matrixCopy = matrix.map(function (arr) {
              return arr.slice();
            });
            matrixCopy[current.y][current.x] = '.';
            stepCount = !ramification ? stepCount + 1 : stepCount;
            ramification += 1;
            // console.log(
            //   `i can climb ${dir}: ${inspectedPoint} ${inspectedX}, ${inspectedY} path ${path}`
            // );

            // if (stepCount <= 50) {
            const trajectory = path + inspectedPoint;
            going(
              { letter: inspectedPoint, x: inspectedX, y: inspectedY },
              stepCount,
              trajectory,
              matrixCopy
            );
            // }
          }
        }
      }
    }

    going(
      { letter: 'a', x: parseInt(S.x), y: parseInt(S.y) },
      1,
      'a',
      rowMatrix
    );

    // console.log('possible routes', possibleRoutes);
    const routeSet = new Set();
    possibleRoutes.forEach((r) => routeSet.add(r.count));

    return Math.min(...routeSet);
  }

  function goldenStar(input) {}

  console.log('silver', silverStar(input));
  console.log('gold', goldenStar(input));
})();

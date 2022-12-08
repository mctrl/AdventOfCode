const helpers = require('../helpers/helpers.js');

(async () => {
  const test = `30373
25512
65332
33549
35390`;

  let input = await helpers.readInput(8);
  // let input = test;
  input = input.split('\n');

  const rowMatrix = input.map((line) => line.split(''));
  const columnMatrix = helpers.transposeMatrix(rowMatrix);

  function silverStar(rowMatrix, columnMatrix) {
    return rowMatrix.reduce((total, currentRow, rowIndex, matrix) => {
      if (rowIndex === 0 || rowIndex === matrix.length - 1)
        return (total += matrix.length);

      const totalPerRow = currentRow.reduce(
        (rowTotal, char, columnIndex, row) => {
          if (columnIndex === 0 || columnIndex === row.length - 1)
            return (rowTotal += 1);

          const treesToTheLeft = row.slice(0, columnIndex);
          const treesToTheRight = row.slice(columnIndex + 1);
          const treesTop = columnMatrix[columnIndex].slice(0, rowIndex);
          const treesBottom = columnMatrix[columnIndex].slice(rowIndex + 1);

          if (
            char > Math.max(...treesToTheLeft) ||
            char > Math.max(...treesToTheRight) ||
            char > Math.max(...treesTop) ||
            char > Math.max(...treesBottom)
          ) {
            return (rowTotal += 1);
          }

          return rowTotal;
        },
        0
      );
      return (total += totalPerRow);
    }, 0);
  }

  function goldenStar(rowMatrix, columnMatrix) {
    return Math.max(
      ...rowMatrix
        .map((currentRow, rowIndex, matrix) => {
          if (rowIndex === 0 || rowIndex === matrix.length - 1)
            return Array(matrix.length).fill(0); // edge row
          return currentRow.map((targetTree, columnIndex, row) => {
            if (columnIndex === 0 || columnIndex === row.length - 1) return 0; // edge tree

            let vLeft = 1;
            let vRight = 1;
            let vTop = 1;
            let vBottom = 1;

            const treesToTheLeft = row
              .slice(0, columnIndex)
              .reverse()
              .every((t, index) => {
                if (t >= targetTree) {
                  vLeft = index + 1;
                  return false;
                }
                vLeft = index + 1;
                return true;
              });
            const treesToTheRight = row
              .slice(columnIndex + 1)
              .every((t, index) => {
                if (t >= targetTree) {
                  vRight = index + 1;
                  return false;
                }
                vRight = index + 1;
                return true;
              });
            const treesTop = columnMatrix[columnIndex]
              .slice(0, rowIndex)
              .reverse()
              .every((t, index) => {
                if (t >= targetTree) {
                  vTop = index + 1;
                  return false;
                }
                vTop = index + 1;
                return true;
              });
            const treesBottom = columnMatrix[columnIndex]
              .slice(rowIndex + 1)
              .every((t, index) => {
                if (t >= targetTree) {
                  vBottom = index + 1;
                  return false;
                }
                vBottom = index + 1;
                return true;
              });
            return vLeft * vRight * vTop * vBottom;
          });
        })
        .flat()
    );
  }

  console.log('silver', silverStar(rowMatrix, columnMatrix));
  console.log('gold', goldenStar(rowMatrix, columnMatrix));
})();

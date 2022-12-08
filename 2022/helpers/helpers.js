const fs = require('fs');

function readInput(dayNum) {
  return new Promise((resolve, reject) => {
    fs.readFile(`day-${dayNum}/input.txt`, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function transpose(matrix) {
  let [row] = matrix;
  return row.map((value, column) => matrix.map((row) => row[column]));
}

module.exports.readInput = readInput;
module.exports.transposeMatrix = transpose;

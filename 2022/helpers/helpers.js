const fs = require("fs");

function readInput(dayNum) {
  return new Promise((resolve, reject) => {
    fs.readFile(`day-${dayNum}/input.txt`, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

module.exports.readInput = readInput;
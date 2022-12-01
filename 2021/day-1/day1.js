const helpers = require("../helpers/helpers.js");

(async () => {
    const test = `199
    200
    208
    210
    200
    207
    240
    269
    260
    263`
    let input = await helpers.readInput(1);
    // let input = test;
    input = input.split("\n").map(n => parseInt(n))

   

    function calculateIncrease(data) {
        let numerOfIncrease = 0;
        let prevNum;
        data.map(n => {
            const currentNum = n;
            numerOfIncrease = currentNum > prevNum ? numerOfIncrease += 1 : numerOfIncrease;
            prevNum = currentNum;
        });
        return numerOfIncrease
    }

    function calculateTriIncrease(data) {
        let numerOfIncrease = 0;
        let prevNum;
        for (let index = 2; index < data.length; index++) {
            const currentNum = data[index] + data[index-1] + data[index-2];
            numerOfIncrease = currentNum > prevNum ? numerOfIncrease += 1 : numerOfIncrease;
            prevNum = currentNum;
        }
        return numerOfIncrease
    }
    console.log(calculateTriIncrease(input));
  })();
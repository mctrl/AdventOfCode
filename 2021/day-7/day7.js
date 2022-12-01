const { resourceUsage } = require("process");
const helpers = require("../helpers/helpers.js");

(async () => {

    const test = `16,1,2,0,4,2,7,1,2,14`;
    let input = await helpers.readInput(7);
    // let input = test;
    input = input.split(',').map(n => parseInt(n))
    // .sort((a,b) => a - b);

    let crabs = {}

    for (let index = 0; index < input.length; index++) {
        crabs[input[index]] = crabs[input[index]] ? crabs[input[index]] +=1 : 1
    }

    let solution = {};

    //or sort the values and only take first and last
    const min = Math.min(...Object.keys(crabs));
    const max = Math.max(...Object.keys(crabs));
  
    for (let position = min; position <= max; position++) {
        solution[position] = Object.entries(crabs).reduce((a, p) => {
            return p[0] !== position ?  calculateFuel(Math.abs(position - p[0])) * p[1] + a : a;
        }, 0)
    }

    function calculateFuel(steps) {
        return steps + ((steps * (steps - 1))/2);
    }

    const minSolution = Object.entries(solution).sort((a, b) => a[1] - b[1])[0];
    console.log(minSolution)

  })();
const helpers = require("../helpers/helpers.js");

(async () => {
    const test = `forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`
    let input = await helpers.readInput(2);
    // let input = test;
    input = input.split("\n");

    function day2(data) {
        let calculation = {
            depth: 0,
            horizontal: 0,
            aim: 0,
        }

        for (let index = 0; index < data.length; index++) {
            // const [ full ,direction, number] = data[index].match(/([A-Za-z]+) ([0-9]+)/);
            const [ direction, number] = data[index].split(' ');
            const value = parseInt(number);
            
            switch(direction) {
                case 'forward':
                    calculation.horizontal += value;
                    calculation.depth += (calculation.aim * value);
                  break;
                case 'up':
                    calculation.aim -= value;
                  break;
                case 'down':
                    calculation.aim += value;
                  break;
              }  
        }
        return calculation

    }

    const solution = day2(input);
    console.log(solution.depth * solution.horizontal);
  })();
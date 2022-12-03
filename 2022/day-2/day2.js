const helpers = require('../helpers/helpers.js');

(async () => {
  const test = `A Y
B X
C Z`;
  let input = await helpers.readInput(2);
  // let input = test;
  input = input.split('\n');
  const values = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  const table = {
    A: {
      win: 8, // 6 + 2
      draw: 4, // 3 + 1
      lose: 3, // 0 + 3
    },
    B: {
      win: 9, // 6 + 3
      draw: 5, // 3 + 2
      lose: 1, // 0 + 1
    },
    C: {
      win: 7, // 6 + 1
      draw: 6, // 3 + 3
      lose: 2, // 0 + 2
    },
  };

  function silverStart(input) {
    console.log(input);
    return input.reduce((prev, current, array) => {
      switch (current) {
        case 'A Y':
          return (prev += 8); //6 + 2
        case 'B Z':
          return (prev += 9); //6 + 3
        case 'C X':
          return (prev += 7); //6 + 1
        case 'A X':
          return (prev += 4); //3 + 1
        case 'B Y':
          return (prev += 5); //3 + 2
        case 'C Z':
          return (prev += 6); //3 + 3
        default:
          return (prev += values[current.charAt(current.length - 1)]);
      }
    }, 0);
  }

  function goldStart(input) {
    return input.reduce((prev, current, array) => {
      const [value, outcome] = current.split(' ');
      switch (outcome) {
        case 'Z':
          return (prev += table[value].win);
        case 'Y':
          return (prev += table[value].draw);
        case 'X':
          return (prev += table[value].lose);
      }
    }, 0);
  }

  console.log('silver', silverStart(input));
  console.log('gold', goldStart(input));
})();

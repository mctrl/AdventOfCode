const helpers = require('../helpers/helpers.js');

(async () => {
  const test = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
  // let input = await helpers.readInput(5);
  let input = test;
  input = input.split('\n');

  const separationIndex = input.findIndex((str) => str.includes('move'));
  const stack = input.splice(0, separationIndex);
  stack.pop();
  const guide = stack.pop();
  const stackPositions = [];
  for (let index = 0; index < guide.length; index++) {
    const element = guide[index];
    if (element !== ' ') stackPositions.push(index);
  }
  const stackObj = stack.reduce((stackObj, currentLine, array) => {
    stackPositions.forEach((position, index) => {
      stackObj[index + 1] = stackObj[index + 1] || [];
      if (currentLine[position] !== ' ') {
        stackObj[index + 1] = [currentLine[position], ...stackObj[index + 1]];
      }
    });
    return stackObj;
  }, {});

  function silverStar(input) {
    const silverStarStackObj = stack.reduce((stackObj, currentLine, array) => {
      stackPositions.forEach((position, index) => {
        stackObj[index + 1] = stackObj[index + 1] || [];
        if (currentLine[position] !== ' ') {
          stackObj[index + 1] = [currentLine[position], ...stackObj[index + 1]];
        }
      });
      return stackObj;
    }, {});

    input.forEach((moveline) => {
      const [quantity, stackFrom, stackTo] = moveline.match(/([0-9]+)/g);

      silverStarStackObj[stackTo] = [
        ...silverStarStackObj[stackTo],
        ...silverStarStackObj[stackFrom]
          .splice(silverStarStackObj[stackFrom].length - quantity, quantity)
          .reverse(),
      ];
    });
    return Object.values(silverStarStackObj).reduce(
      (result, stack) => (result += stack[stack.length - 1]),
      ''
    );
  }

  function goldStar(input) {
    const goldStarStackObj = stack.reduce((stackObj, currentLine, array) => {
      stackPositions.forEach((position, index) => {
        stackObj[index + 1] = stackObj[index + 1] || [];
        if (currentLine[position] !== ' ') {
          stackObj[index + 1] = [currentLine[position], ...stackObj[index + 1]];
        }
      });
      return stackObj;
    }, {});

    input.forEach((moveline) => {
      const [quantity, stackFrom, stackTo] = moveline.match(/([0-9]+)/g);

      goldStarStackObj[stackTo] = [
        ...goldStarStackObj[stackTo],
        ...goldStarStackObj[stackFrom].splice(
          goldStarStackObj[stackFrom].length - quantity,
          quantity
        ),
        // .reverse(),
      ];
    });
    return Object.values(goldStarStackObj).reduce(
      (result, stack) => (result += stack[stack.length - 1]),
      ''
    );
  }

  console.log('silver', silverStar(input));
  console.log('gold', goldStar(input));
})();

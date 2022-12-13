const { isArray } = require('util');
const helpers = require('../helpers/helpers.js');

// WIP working with test but not with input
// problem in the looping with mixed values
// if values keeps getting an array, it then doesn't keep going with the search if no unordered value is found
// instead, it wrongly checks for length of the array because if falls into the array category after conversion

(async () => {
  const test = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

  const test2 = `
[[[[2,1,4],[5],[7],0,[4,7]],0,7,7,8],[[8,8],[],[[],[0,3,8,2,3],[3,6,6]],[10,4,4,5,[]]],[10,[8],[],[[],[4,2],[4,9]]],[[[0,7,6,8],[3,2,3,4],[9,0,1,4,7],[2,8],[4,1]],[1,[8],[3,9,10,5,8],1,4],6,3]]
[[6,7,9,[2],4]]`;

  const test3 = `[[[]]]
[[]]`;

  let input = await helpers.readInput(13);
  // let input = test;
  input = input
    .split('\n')
    .filter((l) => l !== '')
    .map((l) => JSON.parse(l))
    .reduce((matrix, line, index) => {
      if (index % 2 === 0) {
        return [...matrix, [line]];
      }
      // console.log('line', index, line, matrix.length);
      matrix[matrix.length - 1].push(line);
      return matrix;
    }, []);

  // console.log('input', input);

  function checkIfWrongOrdered(first, second, conversion) {
    console.log('checkIfWrongOrdered', first, second);
    if (first === undefined) first = 0;
    if (second === undefined) second = 0;

    if (typeof first === 'number' && typeof second === 'number') {
      // both are numbers
      if (first > second) {
        console.log('both numbers and NOT ordered');
        return true;
      } else {
        console.log('both numbers and ordered');
      }
    }

    if (Array.isArray(first) && Array.isArray(second)) {
      if (first.length && second.length) {
        const data = {
          notLengthOrdered: first.length > second.length,
          get minLength() {
            return this.notLengthOrdered ? second.length : first.length;
          },
        };
        for (let index = 0; index < data.minLength; index++) {
          console.log(
            `in loop array has length checking array data at index ${index} ${first[0]}`,
            first[index],
            second[index]
          );

          // array situation
          const notOrdered = checkIfWrongOrdered(
            first[index],
            second[index],
            conversion
          );
          console.log('both arrays with length returned', notOrdered);
          // if (notOrdered === undefined) {
          //   if (data.notLengthOrdered) {
          //     return true;
          //   }
          // }
          if (notOrdered) return true;
        }

        console.log('no item in array was unordered');
        if (data.notLengthOrdered && conversion !== true) {
          console.log('LENGTH unordered');
          return true;
        }
      }

      console.log('chekcing conversion', conversion);

      if (first.length > second.length && conversion !== true) {
        console.log('second array has ran out of items NOT ordered');
        return true;
      }

      console.log('array 1 has not length', first.length);
    }

    if (Array.isArray(first) && typeof second === 'number') {
      if (second !== 0) {
        console.log(`first is array and second not 0 converting`);

        // if (first[0] === undefined) first[0] = 0;

        // if (first[0] > second) {
        //   return true;
        // }

        const notOrdered = checkIfWrongOrdered(first, [second], true);
        if (notOrdered) return true;
      }
    }

    if (Array.isArray(second) && typeof first === 'number') {
      if (first !== 0) {
        console.log(`second is array and first not 0 converting`);

        // if (second[0] === undefined) second[0] = 0;
        const notOrdered = checkIfWrongOrdered([first], second, true);
        if (notOrdered) return true;

        // if (first > second[0]) {
        //   return true;
        // }
      }
    }
  }

  function silverStar(input) {
    const result = input.reduce((total, pair, index) => {
      const [first, second] = pair;
      console.log(`---------testing ${index + 1} ${first} vs ${second}`, pair);
      const notOrdered = checkIfWrongOrdered(first, second);
      const isOrdered = Boolean(
        notOrdered ? 0 : Number(first.length <= second.length)
      );
      console.log('-----------top level isOrdered', index + 1, isOrdered);
      return isOrdered ? (total += index + 1) : total;
    }, 0);
    console.log(result);
  }

  function goldenStar(input) {}

  console.log('silver', silverStar(input));
  console.log('gold', goldenStar(input));
})();

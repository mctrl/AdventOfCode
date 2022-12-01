const helpers = require('../helpers/helpers.js');

(async () => {
  const test = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;
  let input = await helpers.readInput(1);
  //   let input = test;
  input = input.split('\n').map((n) => parseInt(n));

  function silverStart(input) {
    const addedCalories = [];
    let calories = 0;
    input.forEach((cal) => {
      if (isNaN(cal)) {
        addedCalories.push(calories);
        calories = 0;
      } else {
        calories += cal;
      }
    });
    return Math.max(...addedCalories);
  }

  function goldStart(input) {
    const addedCalories = [];
    let calories = 0;
    input.forEach((cal) => {
      if (isNaN(cal)) {
        addedCalories.push(calories);
        calories = 0;
      } else {
        calories += cal;
      }
    });
    addedCalories.sort(function (a, b) {
      return b - a;
    });
    return addedCalories[0] + addedCalories[1] + addedCalories[2];
  }

  console.log('silver', silverStart(input));
  console.log('gold', goldStart(input));
})();

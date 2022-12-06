const helpers = require('../helpers/helpers.js');

(async () => {
  // const test = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`; // 11 // 26
  // const test = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`; // 10 // 29
  const input = await helpers.readInput(6);
  // let input = test;
  // input = input.split('\n');

  const silverStar = 4;
  const goldStar = 14;

  function calculateUniqueIndex(uniqueCharacters, input) {
    const comparison = [];
    let currentDuplicatedValues = {};

    for (let index = 0; index < input.length; index++) {
      const element = input[index];

      if (comparison.length === uniqueCharacters) {
        const removedItem = comparison.shift();

        if (currentDuplicatedValues[removedItem]) {
          currentDuplicatedValues[removedItem] -= 1;
          if (currentDuplicatedValues[removedItem] === 0)
            delete currentDuplicatedValues[removedItem];
        }
      }
      comparison.push(element);

      if (comparison.indexOf(element) !== comparison.length - 1) {
        // we have a duplicate
        currentDuplicatedValues[element] =
          currentDuplicatedValues[element] || 0;

        currentDuplicatedValues[element] += 1;
      }

      if (
        comparison.length === uniqueCharacters &&
        Object.values(currentDuplicatedValues).length === 0
      ) {
        return index + 1;
      }
    }
  }

  console.log('silver', calculateUniqueIndex(silverStar, input));
  console.log('gold', calculateUniqueIndex(goldStar, input));
})();

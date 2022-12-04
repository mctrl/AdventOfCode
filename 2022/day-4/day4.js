const helpers = require('../helpers/helpers.js');

(async () => {
  const test = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
  let input = await helpers.readInput(4);
  // let input = test;
  input = input.split('\n');

  function silverStar(input) {
    return input.reduce((total, pairs, array) => {
      // put the pair with more numbers first so second pair is always smaller
      const [[startNumPair1, endNumPair1], [startNumPair2, endNumPair2]] = pairs
        .split(',')
        .sort((a, b) => {
          const [firstNumberA, secondNumberA] = a
            .split('-')
            .map((n) => parseInt(n));
          const [firstNumberB, secondNumberB] = b
            .split('-')
            .map((n) => parseInt(n));
          if (secondNumberA - firstNumberA < secondNumberB - firstNumberB) {
            return 1;
          }
          if (secondNumberA - firstNumberA > secondNumberB - firstNumberB) {
            return -1;
          }
          // a must be equal to b
          return 0;
        })
        .map((pair) => [...pair.split('-').map((n) => parseInt(n))]);
      // if shorter pair is fully contained in longer pair they overlap
      if (startNumPair2 >= startNumPair1 && endNumPair2 <= endNumPair1) {
        // overlapping pairs
        return (total += 1);
      }
      return total;
    }, 0);
  }

  function goldStar(input) {
    return input.reduce((total, pairs, array) => {
      // sort pairs with the one with the smaller starting number first
      const [[_, endNumPair1], [startNumPair2]] = pairs
        .split(',')
        .sort((a, b) => {
          const [firstNumberA] = a.split('-').map((n) => parseInt(n));
          const [firstNumberB] = b.split('-').map((n) => parseInt(n));
          if (firstNumberA < firstNumberB) {
            return -1;
          }
          if (firstNumberA > firstNumberB) {
            return 1;
          }
          // a must be equal to b
          return 0;
        })
        .map((pair) => [...pair.split('-').map((n) => parseInt(n))]);
      // if first pair doesn't end before second pair starts they are overlapping
      if (endNumPair1 >= startNumPair2) {
        // overlapping pairs
        return (total += 1);
      }
      return total;
    }, 0);
  }

  console.log('silver', silverStar(input));
  console.log('gold', goldStar(input));
})();

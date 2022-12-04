const helpers = require('../helpers/helpers.js');

(async () => {
  const test = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
  let input = await helpers.readInput(3);
  // let input = test;
  input = input.split('\n');
  const values = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    A: 27,
    B: 28,
    C: 29,
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52,
  };

  function silverStar(input) {
    return input.reduce((total, rucksack) => {
      let elementTotal = 0;
      const secondHalf = rucksack.slice(rucksack.length / 2, rucksack.length);
      for (let index = 0; index < rucksack.length / 2; index++) {
        const element = rucksack[index];
        if (secondHalf.includes(element)) {
          // found the duplicated element
          elementTotal = values[element];
          break;
        }
      }
      return (total += elementTotal);
    }, 0);
  }

  function goldStar(input) {
    let total = 0;
    for (let index = 0; index < input.length; index += 3) {
      let j = index;
      let commonElement;
      const [reference, firstArray, secondArray] = [
        input[j],
        input[j + 1],
        input[j + 2],
      ].sort((a, b) => a.length - b.length);
      for (let i = 0; i < reference.length; i++) {
        const element = reference[i];
        if (firstArray.includes(element) && secondArray.includes(element)) {
          //found common element
          commonElement = element;
          break;
        }
      }
      total += values[commonElement];
    }
    return total;
  }

  console.log('silver', silverStar(input));
  console.log('gold', goldStar(input));
})();

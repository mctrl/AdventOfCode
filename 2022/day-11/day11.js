const helpers = require('../helpers/helpers.js');

(async () => {
  const test = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

  let input = await helpers.readInput(11);
  // let input = test;
  input = input.split('Monkey ').filter((p) => p !== '');

  function day11(input, rounds, part1) {
    const monkeys = input.reduce((obj, current) => {
      const lines = current.split('\n');
      const monkeyNumber = parseInt(helpers.extractDigits(lines[0])[0]);
      const items = helpers.extractDigits(lines[1]).map((n) => parseInt(n));
      const operation = lines[2].split('= ')[1].split(' ');
      const division = parseInt(helpers.extractDigits(lines[3])[0]);
      const trueCondition = parseInt(helpers.extractDigits(lines[4])[0]);
      const falseCondition = parseInt(helpers.extractDigits(lines[5])[0]);
      return {
        ...obj,
        [monkeyNumber]: {
          items,
          operation,
          division,
          trueCondition,
          falseCondition,
          inspected: 0,
        },
      };
    }, {});
    const maxCommonNumber = Object.values(monkeys)
      .map((m) => m.division)
      .reduce((a, b) => a * b, 1);

    for (let index = 0; index < rounds; index++) {
      Object.values(monkeys).map((monkey, index) => {
        monkey.items.forEach((oldWorryLevel) => {
          let worryLevel;
          const op = monkey.operation[1];
          const quantity =
            monkey.operation[2] === 'old'
              ? oldWorryLevel
              : parseInt(monkey.operation[2]);
          switch (op) {
            case '*':
              worryLevel = oldWorryLevel * quantity;
              break;
            case '+':
              worryLevel = oldWorryLevel + quantity;
              break;
          }

          worryLevel = part1
            ? Math.floor(worryLevel / 3)
            : (worryLevel = worryLevel % maxCommonNumber);

          if (worryLevel % monkey.division) {
            // not divisible
            monkeys[monkey.falseCondition].items.push(worryLevel);
          } else {
            // divisible
            monkeys[monkey.trueCondition].items.push(worryLevel);
          }
        });
        monkey.inspected += monkey.items.length;
        monkey.items = [];
        return { ...monkey };
      });
    }

    const [firstValue, secondValue] = [...Object.values(monkeys)]
      .map((m) => m.inspected)
      .sort((a, b) => b - a);

    return firstValue * secondValue;
  }

  console.log('silver', day11(input, 20, true));
  console.log('gold', day11(input, 10000, false));
})();

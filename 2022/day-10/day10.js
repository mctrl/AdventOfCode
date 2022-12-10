const helpers = require('../helpers/helpers.js');

(async () => {
  const test2 = `noop
addx 3
addx -5`;
  const test = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

  let input = await helpers.readInput(10);
  // let input = test;
  input = input.split('\n');

  function silverStar(input, cyclesToCheck) {
    return input
      .map((line) => line.split(' '))
      .reduce(
        (cycles, line) => {
          const [_, number] = line;
          if (!number) {
            return [...cycles, 0];
          }
          return [...cycles, 0, parseInt(number)];
        },
        [1]
      )
      .splice(0, cyclesToCheck[cyclesToCheck.length - 1] + 1)
      .reduce(
        (obj, cycle, index) => {
          let addition = 0;
          if (cyclesToCheck.includes(index)) {
            addition = obj.cycleTotal * index;
          }
          return {
            cycleTotal: (obj.cycleTotal += cycle),
            total: (obj.total += addition),
          };
        },
        {
          cycleTotal: 0,
          total: 0,
        }
      ).total;
  }

  function goldenStar(input) {
    const matrixToFill = Array(6).fill(Array(40).fill('.'));
    const cycles = input
      .map((line) => line.split(' '))
      .reduce(
        (cycles, line) => {
          const [_, number] = line;
          if (!number) {
            return [...cycles, 0];
          }
          return [...cycles, 0, parseInt(number)];
        },
        [1]
      )
      .splice(0, 241);

    let spritePosition = 1;
    return matrixToFill.map((line, lineIndex) => {
      return line
        .map((char, cycleIndex) => {
          const pointerPosition = cycleIndex + 1;
          const visible =
            pointerPosition >= spritePosition &&
            pointerPosition <= spritePosition + 2;

          spritePosition += cycles[line.length * lineIndex + pointerPosition];
          return visible ? '#' : char;
        })
        .join('');
    });
  }

  console.log('silver', silverStar(input, [20, 60, 100, 140, 180, 220]));
  console.log('gold', goldenStar(input));
})();

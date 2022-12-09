const helpers = require('../helpers/helpers.js');

(async () => {
  const test = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

  let input = await helpers.readInput(9);
  // let input = test;
  input = input.split('\n');

  function silverStar(input) {
    let Tpos = {
      x: 0,
      y: 0,
    };
    let Hpos = {
      x: 0,
      y: 0,
    };
    const positionCovered = new Set();
    positionCovered.add(`${Tpos.x},${Tpos.y}`);

    input.forEach((row, index) => {
      const [direction, moves] = row.split(' ');
      for (let index = 1; index <= parseInt(moves); index++) {
        switch (direction) {
          case 'L':
            Hpos.x -= 1;
            if (Math.abs(Hpos.x - Tpos.x) > 1) {
              Tpos.x = Hpos.x + 1;
              Tpos.y = Hpos.y;
            }
            break;
          case 'R':
            Hpos.x += 1;
            if (Math.abs(Hpos.x - Tpos.x) > 1) {
              Tpos.x = Hpos.x - 1;
              Tpos.y = Hpos.y;
            }
            break;
          case 'U':
            Hpos.y += 1;
            if (Math.abs(Hpos.y - Tpos.y) > 1) {
              Tpos.y = Hpos.y - 1;
              Tpos.x = Hpos.x;
            }
            break;
          case 'D':
            Hpos.y -= 1;
            if (Math.abs(Hpos.y - Tpos.y) > 1) {
              Tpos.x = Hpos.x;
              Tpos.y = Hpos.y + 1;
            }
            break;
        }
        positionCovered.add(`${Tpos.x},${Tpos.y}`);
      }
    });

    return positionCovered.size;
  }

  function goldenStar(input) {}

  console.log('silver', silverStar(input));
  console.log('gold', goldenStar(input));
})();

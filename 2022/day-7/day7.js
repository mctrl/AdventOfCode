const helpers = require('../helpers/helpers.js');

(async () => {
  const test = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

  let input = await helpers.readInput(7);
  // let input = test;
  input = input.split('\n');

  function createTree(input) {
    const tree = {};
    let directoryPath = [];

    for (let index = 0; index < input.length; index++) {
      const [first, second, directory] = input[index].split(' ');

      if (first === '$' && second === 'cd' && directory !== '..') {
        directoryPath.push(directory);
      }
      if (first === '$' && second === 'cd' && directory === '..') {
        directoryPath.pop();
      }
      if (first !== '$' && first !== 'dir') {
        const total = parseInt(first);
        directoryPath.reduce((d, c) => {
          d += `-${c}`;

          tree[d] = tree[d] ? (tree[d] += total) : total;
          return d;
        }, '');
      }
    }

    return tree;
  }

  function silverStar(input) {
    const tree = createTree(input);

    return Object.values(tree).reduce(
      (total, sum) => (sum <= 100000 ? (total += sum) : total),
      0
    );
  }

  function goldenStar(input) {
    const tree = createTree(input);
    const space = 70000000;
    const needed = 30000000;
    const used = tree['-/'];
    const available = space - used;
    const stillToBeDeleted = needed - available;

    return Math.min(
      ...Object.values(tree).filter((value) => value >= stillToBeDeleted)
    );
  }

  console.log('silver', silverStar(input));
  console.log('gold', goldenStar(input));
})();

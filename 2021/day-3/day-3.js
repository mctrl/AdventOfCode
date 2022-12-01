const helpers = require("../helpers/helpers.js");

(async () => {
    const test = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`
    let input = await helpers.readInput(3);
    // let input = test;
    input = input.split("\n");

    function silverStar(data) {
        const binarySample = data[0].length
        
        let gammaBinary = new Array(binarySample).fill(0);
        let epsilonBinary = new Array(binarySample).fill(0);
        let count = new Array(binarySample).fill(0);
        for (let index = 0; index < data.length; index++) {
            Array.from(data[index]).forEach((n, i) => {
                count[i] = n === '0' ? count[i] += 1 : count[i];
            });
        }
        const max = Math.floor(data.length/2);

        count.forEach((n, i) => {
            // if 0 is the most common number then
            if (n > max) { // >=?
                gammaBinary[i] = '0'
                epsilonBinary[i] = '1'
            } else {
                epsilonBinary[i] = '0'
                gammaBinary[i] = '1'
            }
        })

        return {
            gamma: parseInt(gammaBinary.join(''), 2),
            epsilon: parseInt(epsilonBinary.join(''), 2),
        }
    }


    function goldenStar(data, most = true, position = 0) {

        // console.log('DATA', data, position)

        if (data.length === 1) return parseInt(data, 2);

        let zeroCount = [];
        let oneCount = [];
        const max = Math.floor(data.length/2);
        let count = 0

        data.forEach((n) => {
            if (n[position] === '0') {
                count += 1
                zeroCount.push(n)
            } else {
                oneCount.push(n)
            }
        })

        if (most) {
            if (count > max) {
                return goldenStar(zeroCount, most, position += 1)
            } else {
                return goldenStar(oneCount, most, position += 1)
            }
        } else {
            if (count <= max) {
                return goldenStar(zeroCount, most, position += 1)
            } else {
                return goldenStar(oneCount, most, position += 1)
            }
        }
    }

    const solution2 = {
        oxigen: goldenStar(input),
        co2: goldenStar(input, false)
    }

    console.log(solution2.oxigen*solution2.co2);

    const solution = silverStar(input)
    console.log(solution.gamma*solution.epsilon)

  })();
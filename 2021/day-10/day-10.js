const helpers = require("../helpers/helpers.js");

(async () => {
    const test = `{([(<{}[<>[]}>{[]{[(<()>
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{`

    const test1 = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`
    let input = await helpers.readInput(10);
    // let input = test1;
    input = input.split("\n");

    // console.log(input)

    const validChars = [')', ']', '}', '>'];
    const counterParts = {
        ')': '(',
        ']': '[',
        '}': '{', 
        '>': '<',
    }

    const points = {
        ')': 3,
        ']': 57,
        '}': 1197, 
        '>': 25137,
    }

    let invalidChars = []
    let invalidStrings = []

    // console.log(input.length)

    const validStrings = input.filter(code => {
        valid = false;
        const arrayOfStuff = [...code];
        for (let index = 0; index < arrayOfStuff.length; index++) {
            // console.log('code lenght', index, arrayOfStuff.length);
            if (validChars.includes(arrayOfStuff[index])) {
                // console.log('found closing', arrayOfStuff[index], index)
                if (arrayOfStuff[index-1] === counterParts[arrayOfStuff[index]]) {

                    // console.log('matching opening', counterParts[arrayOfStuff[index]])
                    arrayOfStuff.splice([index-1], 2);
                    index -= 2;
                    // [...code].splice([index-1], 2).join('')
                    // index -= 2;
                } else {
                    // console.log('NOT MATCHING CONTERPARTS LOGGING IT', arrayOfStuff[index] )
                    invalidChars.push(arrayOfStuff[index]);
                    return false;
                }
            }
        }

        return true;

    })


    let completingChars = [];

    const validChars2 = ['(', '[', '{', '<'];
    const counterParts2 = {
        '(': ')',
        '[': ']',
        '{': '}', 
        '<': '>',
    }

    const points2 = {
        '(': 1,
        '[': 2,
        '{': 3, 
        '<': 4,
    }

    const solition = invalidChars.map(char => points[char]).reduce((a, n) => { return a + n; }, 0)
    // console.log(solition);
    console.log(validStrings)

    var remains = validStrings.map((charString => {
        // console.log('validSTring Before', validStrings[index])
        // const element = [...validStrings[index]];
        const element = [...charString].reverse();
        // console.log('validSTring After', element)

        for (let index = 0; index < element.length; index++) {
            // console.log('code lenght', index, arrayOfStuff.length);
            if (validChars2.includes(element[index])) {
                // console.log('found closing', arrayOfStuff[index], index)
                if (element[index-1] === counterParts2[element[index]]) {

                    // console.log('matching opening', counterParts[arrayOfStuff[index]])
                    element.splice([index-1], 2);
                    index -= 2;
                    // [...code].splice([index-1], 2).join('')
                    // index -= 2;
                }
            }
        }

    // }}]])})] - 288957 total points.
    // )}>]}) - 5566 total points.
    // }}>}>)))) - 1480781 total points.
    // ]]}}]}]}> - 995444 total points.
    // ])}> - 294 total points.
        
        return element.join('')
    }))

    function calculateScore(input, result = 0) {
       
        if (input.length === 0) return result;
        // console.log('calculateScore',input)
        result = (result * 5) + points2[input[0]];
        input.splice(0,1)
        // console.log('result', result, input)

        return calculateScore(input, result);
    }

    console.log('remains', remains)
    // const something = calculateScore([...remains[4]])
    // console.log('something', something)

    const solution = remains.map(r => calculateScore([...r])).sort((a, b) => a-b)
    
    console.log(solution[Math.floor(solution.length/2)])
        
    // calculateScore('{{[[({([')

  })();
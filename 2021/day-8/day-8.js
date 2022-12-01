const { resourceUsage } = require("process");
const { PassThrough } = require("stream");
const helpers = require("../helpers/helpers.js");

(async () => {
    const test1= `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;
    const test = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`
    let input = await helpers.readInput(8);
    // let input = test;
    input = input.split("\n")

    const combinations = input.map(line => {
        return line.split(' | ')
    })

    const arrayOfNumbers = combinations.map(pair => {
        let decoder = []
        const [legenda, numbers] = pair;

        const order = legenda.split(' ').sort((a, b) => a.length - b.length)
        decoder[1] = sorted(order.shift());
        decoder[7] = sorted(order.shift());
        decoder[4] = sorted(order.shift());
        decoder[8] = sorted(order.pop());
        
        const top = [...decoder[7]].filter(d => ![...decoder[1]].includes(d))[0]

        // find of 6 digits numbers
        const sixDigits = order.splice(3, order.length);

        decoder[9] = sorted(sixDigits.splice(sixDigits.findIndex(nil => [...decoder[4], top].every(n => [...nil].includes(n))), 1)[0]);

        const leftDown = [...decoder[8]].filter(n => ![...decoder[9]].includes(n))[0]

        decoder[0] = sorted(sixDigits.splice(sixDigits.findIndex(nil => [...decoder[1]].every(n => [...nil].includes(n))), 1)[0]);

        decoder[6] = sorted(sixDigits[0]);

        // find out 5 digits numbers
        decoder[3] = sorted(order.splice(order.findIndex(nil =>  [...decoder[1]].every(n => [...nil].includes(n))), 1)[0]);
        decoder[2] = sorted(order.splice(order.findIndex(nil =>  [...nil].includes(leftDown)), 1)[0]);
        decoder[5] = sorted(order[0]);

        return numbers.split(' ').map(nil => {
            let number;
            switch (nil.length) {
                case 2:
                    number = 1;
                    break;
            
                case 3:
                    number = 7;
                    break;
    
                case 4:
                    number = 4;
                    break;
    
                case 7:
                    number = 8;
                    break;
                default:
                    number = decoder.indexOf(sorted(nil))
                    break;
                
            }

            return number;
        }).join('');
        
    })

    function sorted(data) {
        return [...data].sort().join('');
    }

    const solution = arrayOfNumbers.reduce((a, n) => parseInt(n) + parseInt(a))

    console.log(solution)

    
  })();
const helpers = require("../helpers/helpers.js");

(async () => {

    const test = `3,4,3,1,2`;
    let input = await helpers.readInput(6);
    // let input = test;
    input = input.split(',').map(n => parseInt(n))

    let days = 256;

    function observeLanterfish(lanterFishArray, prevNewFish) {
        // console.log(lanterFishArray)
        if (days === 0) return lanterFishArray;
        days -= 1;

        let newFish = []


        const newLanternFishArray = lanterFishArray.map(cycle => {
            if (cycle === 0) {
               return 6;
            }
            cycle -= 1;
            if (cycle === 0) newFish.push(8);
            return cycle;
        })
        .concat(prevNewFish.splice(0, prevNewFish.length));


        return observeLanterfish(newLanternFishArray, newFish)

    }

    let allTheFish = 0;

    function howManyLaternFish(n, days) { // 0 // 14
        allTheFish +=1
        if (n === 0) days-=7
        for (let index = days - n; index > 0; index-=7) {
            howManyLaternFish(8, index-1)
        }
    }

    let freq = {}

    for (let index = 0; index < input.length; index++) {
        freq[input[index]] = freq[input[index]] ? freq[input[index]] +=1 : 1
    }

    for (let index = 1; index <= days; index++) {
        let newFreq = {};
        for (const key in freq) {
            if (Object.hasOwnProperty.call(freq, key)) {
                const element = freq[key];
                
                if (key == 0) {
                    newFreq[8] = freq[key];
                    newFreq[6] = freq[key]
                } else {
                    newFreq[key-1] = newFreq[key-1] ? newFreq[key-1] + freq[key] : freq[key] 
                }
            }
        }
        freq = newFreq;
    }

    console.log(Object.values(freq).reduce((a, c) => { return a + c;} , 0))
    
    // input.forEach(e => {
    //     howManyLaternFish(e, day);
    // });
    // const solution = observeLanterfish(input, []);
    // console.log(solution)
    // console.log(solution.length)
    // console.log(allTheFish === 26984457539, allTheFish)
    // console.log('allTheFish', allTheFish)

    // calculate how many new lanternFish the ouput can generate on it's own 80/7 = 11

  })();
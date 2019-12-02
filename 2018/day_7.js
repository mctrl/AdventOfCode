var listOfSteps = `Step T must be finished before step X can begin.
Step G must be finished before step O can begin.
Step X must be finished before step B can begin.
Step I must be finished before step W can begin.
Step N must be finished before step V can begin.
Step K must be finished before step H can begin.
Step S must be finished before step R can begin.
Step P must be finished before step J can begin.
Step L must be finished before step V can begin.
Step D must be finished before step E can begin.
Step J must be finished before step R can begin.
Step U must be finished before step W can begin.
Step M must be finished before step Q can begin.
Step B must be finished before step F can begin.
Step F must be finished before step E can begin.
Step V must be finished before step Q can begin.
Step C must be finished before step A can begin.
Step H must be finished before step Z can begin.
Step A must be finished before step Y can begin.
Step O must be finished before step Y can begin.
Step W must be finished before step Q can begin.
Step E must be finished before step Y can begin.
Step Y must be finished before step Z can begin.
Step Q must be finished before step R can begin.
Step R must be finished before step Z can begin.
Step S must be finished before step E can begin.
Step O must be finished before step W can begin.
Step G must be finished before step B can begin.
Step I must be finished before step N can begin.
Step G must be finished before step I can begin.
Step H must be finished before step R can begin.
Step N must be finished before step C can begin.
Step M must be finished before step W can begin.
Step Y must be finished before step R can begin.
Step T must be finished before step B can begin.
Step G must be finished before step D can begin.
Step J must be finished before step O can begin.
Step I must be finished before step A can begin.
Step J must be finished before step H can begin.
Step T must be finished before step Y can begin.
Step N must be finished before step H can begin.
Step B must be finished before step V can begin.
Step M must be finished before step R can begin.
Step Y must be finished before step Q can begin.
Step X must be finished before step J can begin.
Step A must be finished before step E can begin.
Step P must be finished before step Z can begin.
Step P must be finished before step C can begin.
Step N must be finished before step Q can begin.
Step A must be finished before step O can begin.
Step G must be finished before step X can begin.
Step P must be finished before step U can begin.
Step T must be finished before step S can begin.
Step I must be finished before step V can begin.
Step V must be finished before step H can begin.
Step U must be finished before step F can begin.
Step D must be finished before step Q can begin.
Step D must be finished before step O can begin.
Step G must be finished before step H can begin.
Step I must be finished before step Z can begin.
Step N must be finished before step D can begin.
Step B must be finished before step Y can begin.
Step J must be finished before step M can begin.
Step V must be finished before step Y can begin.
Step W must be finished before step Y can begin.
Step E must be finished before step Z can begin.
Step T must be finished before step N can begin.
Step L must be finished before step U can begin.
Step S must be finished before step A can begin.
Step Q must be finished before step Z can begin.
Step T must be finished before step F can begin.
Step F must be finished before step Z can begin.
Step J must be finished before step C can begin.
Step X must be finished before step Y can begin.
Step K must be finished before step V can begin.
Step T must be finished before step I can begin.
Step I must be finished before step O can begin.
Step C must be finished before step W can begin.
Step B must be finished before step Q can begin.
Step W must be finished before step Z can begin.
Step D must be finished before step H can begin.
Step K must be finished before step A can begin.
Step M must be finished before step E can begin.
Step T must be finished before step U can begin.
Step I must be finished before step J can begin.
Step O must be finished before step Q can begin.
Step M must be finished before step Z can begin.
Step U must be finished before step C can begin.
Step N must be finished before step F can begin.
Step C must be finished before step H can begin.
Step X must be finished before step E can begin.
Step F must be finished before step O can begin.
Step P must be finished before step O can begin.
Step J must be finished before step A can begin.
Step H must be finished before step Y can begin.
Step A must be finished before step Q can begin.
Step V must be finished before step Z can begin.
Step S must be finished before step L can begin.
Step H must be finished before step E can begin.
Step X must be finished before step I can begin.
Step O must be finished before step R can begin.`.split('\n')
    .map(step => [firstStep, followingStep] = step.match(/(\b[A-Z]\b)/g))
    .sort();

var test = `Step B must be finished before step E can begin.
Step C must be finished before step A can begin.
Step F must be finished before step E can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step D must be finished before step E can begin.
Step C must be finished before step F can begin.`.split('\n')
    .map(step => [firstStep, followingStep] = step.match(/(\b[A-Z]\b)/g))
    .sort();

// console.log(listOfSteps)
var treeOfDependencies = {};
var threeOfStepsBefore = {};
var orderOfExecution = [];

test.forEach(item => {
    treeOfDependencies[item[1]] = (treeOfDependencies[item[1]] || [])
    treeOfDependencies[item[0]] = (treeOfDependencies[item[0]] || [])
    // threeOfStepsBefore[item[0]] = (threeOfStepsBefore[item[0]] || [])

    treeOfDependencies[item[1]].push(item[0]);
    // threeOfStepsBefore[item[0]].push(item[1]);

});
var dependencies = [];
for (const key in treeOfDependencies) {
    if (treeOfDependencies.hasOwnProperty(key)) {
        const element = treeOfDependencies[key];
        // delete treeOfDependencies[key]; 
        if (element.length === 0) {
            dependencies.push(key)
        }  
    }
}
//check the letters that have array of dependencies empty eg(C)
//find the other



//check if they are dependencies themselves on other letters and choose the only one that has not dependencies
//if more than one is free and with no dependencies, add them in array, sort them and then add them all together
//remove the added letter from the list of dependencies of the other letters

console.log(treeOfDependencies);

// var orderOfExecution = [];

// listOfSteps.forEach(step => {
//     var [firstStep, followingStep] =  step.match(/(\b[A-Z]\b)/g);
//     if (!orderOfExecution || (orderOfExecution.indexOf(firstStep) === -1 && orderOfExecution.indexOf(followingStep) === -1)) {
//         orderOfExecution.push(firstStep, followingStep);
//     } else if(orderOfExecution.indexOf(firstStep) !== -1 && orderOfExecution.indexOf(followingStep) === -1) {
//         //if first but not second insert second after first
//         var index = orderOfExecution.indexOf(firstStep);
//         orderOfExecution.splice(index+1, 0, followingStep) //replace letter after index of firstStep with followingStep and push the others down
//     } else if(orderOfExecution.indexOf(firstStep) === -1 && orderOfExecution.indexOf(followingStep) !== -1) {
//         //if second but not first - insert first before second
//         var index = orderOfExecution.indexOf(followingStep);
//         orderOfExecution.splice(index, 0, firstStep)
//     } else if(orderOfExecution.indexOf(firstStep) > orderOfExecution.indexOf(followingStep)) {
//         //if fistStep is found after followingStep, rearrange the array
//         orderOfExecution.splice(orderOfExecution.indexOf(firstStep), 1);
//         orderOfExecution.splice(orderOfExecution.indexOf(followingStep), 0, firstStep);
//     };
// });
// var fist = orderOfExecution.shift();
// var last = orderOfExecution.pop();
// orderOfExecution.sort();
// orderOfExecution.unshift(fist);
// orderOfExecution.push(last);
// console.log(orderOfExecution.join(''))





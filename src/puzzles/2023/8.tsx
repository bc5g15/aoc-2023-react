import { PuzzleForm, Solution } from "../PuzzleForm"
import { leastCommonMultiple } from "../helpers";

const part2 = (directions: string, maps: Map<string, [string, string]>) => {
    const nodes = [...maps.keys()].filter(v => v[2] === 'A');

    const stepCounts = nodes.map(n => {
        let current = n;
        let steps = 0;
        while (current[2] !== 'Z') {
            const direction = directions[steps % directions.length] === 'L' ? 0 : 1;
            current = maps.get(current)![direction]
            steps++
        }

        // It is only by the mercy of the puzzle that I didn't have to do an offset based on loop time!
        // let seenAgain = false;
        // let next = current;
        // let loopTime = 0;
        // while (!seenAgain) {
        //     const direction = directions[(loopTime+steps) % directions.length] === 'L' ? 0 : 1;
        //     next = maps.get(next)![direction]
        //     if (next === current) seenAgain = true;
        //     loopTime++
        // }

        return steps;
    })

    return leastCommonMultiple(...stepCounts);
}

const solve: Solution = (input) => {
    const lines = input.split('\n');
    const directions = lines[0];

    const directionMap: Map<string, [string, string]> = new Map();

    for (let i = 2; i < lines.length; i++) {
        const line = lines[i];
        const matches = line.match(/(...) = \((...), (...)\)/u)!;
        directionMap.set(matches[1], [matches[2], matches[3]])
    }

    // Navigate
    let current = 'AAA';
    let steps = 0;
    while (current !== 'ZZZ') {
        const direction = directions[steps % directions.length] === 'L' ? 0 : 1;
        current = directionMap.get(current)![direction]
        steps++
    }

    const wholeTripTime = part2(directions, directionMap);


    return (<>
        <div>
            {steps}
        </div>
        <div>
            {wholeTripTime}
        </div>
    </>)
}

export const HauntedWasteland = () => (
    <>
        <h1>Day 8: Haunted Wasteland</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
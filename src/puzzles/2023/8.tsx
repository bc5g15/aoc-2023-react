import { PuzzleForm, Solution } from "../PuzzleForm"

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

    return (<>
        <div>
            {steps}
        </div>
        <div>
        </div>
    </>)
}

export const HauntedWasteland = () => (
    <>
        <h1>Day 8: Haunted Wasteland</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
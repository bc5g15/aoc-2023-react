import { PuzzleForm, Solution } from "../PuzzleForm"

const check = (time: number, distance: number) => {
    let solutions = 0;
    for (let i = 0; i < time; i++) {
        if (distance < i * (time-i)) {
            solutions++
        }
    }
    return solutions
}

const solve: Solution = (input) => {

    const lines = input.split('\n');
    const timeMatches = [...lines[0].matchAll(/\d+/gu)].map(v => parseInt(v[0]));
    const distanceMatches = [...lines[1].matchAll(/\d+/gu)].map(v => parseInt(v[0]));

    let final = 1;
    for (let i = 0; i < timeMatches.length; i++) {
        const time = timeMatches[i];
        const distance = distanceMatches[i];

        final *= check(time, distance);
    }

    const time2 = parseInt(timeMatches.join(''));
    const distance2 = parseInt(distanceMatches.join(''));

    const final2 = check(time2, distance2);

    return (<>
        <div>
            {final}
        </div>
        <div>
            {final2}
        </div>
    </>)
}

export const WaitForIt = () => (
    <>
        <h1>Day 6: Name</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
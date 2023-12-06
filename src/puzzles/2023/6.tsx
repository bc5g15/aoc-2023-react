import { PuzzleForm, Solution } from "../PuzzleForm"

const check2 = (time: number, distance: number) => {
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
    console.log(timeMatches);
    // let finalResult = 1;
    let final2 = 1;
    for (let i = 0; i < timeMatches.length; i++) {
        const time = timeMatches[i];
        const distance = distanceMatches[i];

        final2 *= check2(time, distance);
    }

    const time2 = parseInt(timeMatches.join(''));
    const distance2 = parseInt(distanceMatches.join(''));

    const final3 = check2(time2, distance2);


    // let otherTry = 

    return (<>
        <div>
            {final2}
        </div>
        <div>
            {final3}
        </div>
    </>)
}

export const WaitForIt = () => (
    <>
        <h1>Day 6: Name</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
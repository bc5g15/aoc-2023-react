import { PuzzleForm, Solution } from "../PuzzleForm"
import { sum } from "../helpers";

const calibration: Solution = (input) => {
    console.log(input);
    const lines = input.split('\n').map(line => {
        const relevant = line.replace(/[^0-9]/gu, '');
        console.log(line);
        const firstChar = relevant[0];
        const lastChar = relevant[relevant.length-1];
        const text = `${firstChar}${lastChar}`;
        console.log(text);
        console.log(relevant);
        return parseInt(`${firstChar}${lastChar}`);
    });

    console.log(lines);

    return (<div>
        {sum(lines)}
    </div>)
}

export const Trebuchet = () => (
    <>
        <h1>Day 1: Trebuchet?!</h1>
        <PuzzleForm onSolve={calibration} />
    </>
)
import { PuzzleForm, Solution } from "../PuzzleForm"
import { sum } from "../helpers";


const calibration: Solution = (input) => {
    const lines = input.replace('+', '').split('\n').map(s => parseInt(s));

    const solution = sum(lines);

    return (<div>
        {solution}
    </div>)
}

export function ChronalCalibration() {
    return <>
        <h1>Chronal Calibration</h1>
        <PuzzleForm onSolve={calibration} />
    </>
}
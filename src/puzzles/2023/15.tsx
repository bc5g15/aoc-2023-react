import { PuzzleForm, Solution } from "../PuzzleForm"
import { sum } from "../helpers";

const process = (code: string) => {
    let value = 0;
    for (let i = 0; i < code.length; i++) {
        value = ((value + code.charCodeAt(i)) * 17) % 256
    }
    return value;
}

const solve: Solution = (input) => {

    const codes = input.split(',');
    const values = codes.map(process);

    return (<>
        <div>
            {sum(values)}
        </div>
        <div>
        </div>
    </>)
}

export const LensLibrary = () => (
    <>
        <h1>Day 15: Lens Library</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
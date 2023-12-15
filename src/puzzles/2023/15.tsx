import { PuzzleForm, Solution } from "../PuzzleForm"
import { sum } from "../helpers";

const hash = (code: string) => {
    let value = 0;
    for (let i = 0; i < code.length; i++) {
        value = ((value + code.charCodeAt(i)) * 17) % 256
    }
    return value;
}

type Lens = {
    label: string;
    value: number;
}
const part2 = (codes: string[]) => {
    const boxes: Lens[][] = (new Array(256)).fill(0).map(() => []);

    codes.forEach(code => {
        const [ label ] = code.match(/\w+/u)!;
        const index = hash(label);
        
        if (code.includes('-')) {
            boxes[index] = boxes[index].filter(s => s.label !== label)
        }

        if (code.includes('=')) {
            const [ value ] = code.match(/\d+/u)!;
            const arr = boxes[index];
            const lensIndex = arr.findIndex(v => v.label === label);

            if (lensIndex === -1) {
                arr.push({ label, value: parseInt(value) })
            } else {
                arr[lensIndex].value = parseInt(value);
            }
        }
    });

    const power = sum(boxes.map((b, bi) => sum(b.map((l, li) => (bi+1) * (li+1) * l.value))));

    return power;
}

const solve: Solution = (input) => {

    const codes = input.split(',');
    const values = codes.map(hash);

    return (<>
        <div>
            {sum(values)}
        </div>
        <div>
            {part2(codes)}
        </div>
    </>)
}

export const LensLibrary = () => (
    <>
        <h1>Day 15: Lens Library</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
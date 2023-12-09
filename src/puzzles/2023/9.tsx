import { PuzzleForm, Solution } from "../PuzzleForm"
import { sum } from "../helpers";

const extrapolate = (history: number[]) => {
    const data: number[][] = [history];
    console.log(history);

    // Build them up
    let datasetComplete = false;
    while(!datasetComplete) {
        const current = data[data.length-1];
        const next = [];
        for (let i = 1; i < current.length; i++) {
            next.push(current[i] - current[i-1]);
        }
        data.push(next);
        if (next.every(v => v === 0)) {
            datasetComplete = true;
        }
    }

    let base = data.pop()!;
    // Knock them down
    while (data.length > 0) {
        const delta = base[base.length-1];
        const current = data.pop()!;
        current.push(current[current.length-1] + delta)
        base = current;
    }

    return base[base.length-1];
}

const solve: Solution = (input) => {
    const histories = input.split('\n').map(l => l.split(' ').map(x => parseInt(x)));
    const value = sum(histories.map(extrapolate));

    return (<>
        <div>
            {value}
        </div>
        <div>
        </div>
    </>)
}

export const MirageMaintenance = () => (
    <>
        <h1>Day 9: Mirage Maintenance</h1>
        <PuzzleForm onSolve={solve} />
    </>
)

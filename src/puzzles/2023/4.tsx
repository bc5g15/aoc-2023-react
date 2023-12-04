import { PuzzleForm, Solution } from "../PuzzleForm"
import { sum } from "../helpers";

const solve: Solution = (input) => {
    const cards = input.split('\n').map(line => 
        line.split(':')[1].split('|').map(l => 
            [...l.matchAll(/\d+/ug)].map(v => parseInt(v[0])))
    );

    // Score checking
    const scores = cards.map(([winners, numbers]) => {
        const winSet = new Set(winners);
        const score = numbers.filter(n => winSet.has(n)).length;
        if (score === 0) return 0;

        return 2**(score-1)
    })

    return (<>
        <div>
            {sum(scores)}
        </div>
        <div>
        </div>
    </>)
}

export const Scratchcards = () => (
    <>
        <h1>Day 4: Scratchcards</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
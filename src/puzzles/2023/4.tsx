import { PuzzleForm, Solution } from "../PuzzleForm"
import { sum } from "../helpers";

const solve: Solution = (input) => {
    const cards = input.split('\n').map(line => 
        line.split(':')[1].split('|').map(l => 
            [...l.matchAll(/\d+/ug)].map(v => parseInt(v[0])))
    );

    const winners = cards.map(([winners, numbers]) => {
        const winSet = new Set(winners);
        return numbers.filter(n => winSet.has(n)).length;
    });

    // Score checking
    const scores = winners.map(score => {
        if (score === 0) return 0;
        return 2**(score-1)
    })

    // Duplicate checking
    const quantities = winners.map(() => 1);
    for (let i = 0; i < winners.length; i++) {
        const current = quantities[i];
        if (winners[i] === 0) continue;

        for (let j = i+1; j<=i+winners[i] && j < quantities.length; j++) {
            quantities[j] += current;
        }
    }

    return (<>
        <div>
            {sum(scores)}
        </div>
        <div>
            {sum(quantities)}
        </div>
    </>)
}

export const Scratchcards = () => (
    <>
        <h1>Day 4: Scratchcards</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
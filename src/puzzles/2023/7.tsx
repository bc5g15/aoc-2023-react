import { PuzzleForm, Solution } from "../PuzzleForm"

const convertHand = (hand: string) => {
    return [...hand].map(c => {
        if (c === 'A') return 'E';
        if (c === 'K') return 'D';
        if (c === 'Q') return 'C';
        if (c === 'J') return 'B';
        if (c === 'T') return 'A';
        return c;
    }).join('')
}

type CardCount = Map<string, number>;

const resolveHand = (hand: string) => {
    const cards: Map<string, number> = new Map();
    for (const card of hand) {
        if (cards.has(card)) {
            cards.set(card, cards.get(card)! + 1);
        } else {
            cards.set(card, 1);
        }
    }
    return cards;
}

const checkHand = (hand: CardCount) => {
    const groups = hand.size;
    const fullGroups = [...hand.entries()];

    // Five of a Kind
    if (groups === 1 ) {
        return 6;
    }

    // Four of a Kind or Full House
    if (groups === 2) {
        if (fullGroups.some(v => v[1] === 4)) {
            // Four of a kind
            return 5;
        } else {
            return 4;
        }
    }

    // Three of a kind or two pairs
    if (groups === 3) {
        if (fullGroups.some(v => v[1] === 3)) {
            // Three of a kind
            return 3;
        } else {
            return 2;
        }
    }

    // Pair
    if (groups === 4) {
        return 1;
    }

    // High card
    return 0;
}

const part1 = (handBids: [string, number][]) => {
    const mine = new Array(...handBids);
    const sortedMine: [string, number][] = mine.map(v => [convertHand(v[0]), v[1]])
    
    const rankedMine: [string, number, number][] = sortedMine.map(h => {
        const handMap = resolveHand(h[0]);
        const rank = checkHand(handMap)
        return [h[0], h[1], rank];
    });

    // sorted by hand
    rankedMine.sort((a, b) => a[0].localeCompare(b[0]));

    // Sorted by tank
    rankedMine.sort((a, b) => a[2] - b[2]);
    return rankedMine.reduce((acc, cur, i) => acc + (cur[1]*(i+1)), 0);
}

const solve: Solution = (input) => {
    const lines = input.split('\n');
    const handBids: [string, number][] = lines.map(v => v.split(' ')).map(v => [v[0], parseInt(v[1])]);

    return (<>
        <div>
            {part1(handBids)}
        </div>
        <div>
        </div>
    </>)
}

export const CamelCards = () => (
    <>
        <h1>Day 7: Camel Cards</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
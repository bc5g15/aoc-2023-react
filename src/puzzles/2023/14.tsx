import { PuzzleForm, Solution } from "../PuzzleForm"

// const toKey = (x: number, y: number) => `${x},${y}`

// type Direction = 'up' | 'down' | 'left' | 'right';

type Screen = string[][];

const rollUp = (screen: Screen) => {
    for ( let y = 0; y < screen.length; y++ ) {
        for ( let x = 0; x < screen[y].length; x++ ) {
            const c = screen[y][x];
            if (c !== 'O') {
                continue;
            }

            let dy = y;
            while (dy > 0) {
                const dc = screen[dy-1][x]
                if (dc === '#' || dc === 'O') {
                    break;
                }
                dy--;
            }
            screen[y][x] = '.';
            screen[dy][x] = 'O';
        }
    }
    return screen;
}

const part1 = (screen: Screen) => {
    let result = 0;
    screen.reverse();
    for ( let y = 0; y < screen.length; y++) {
        for (let x = 0; x < screen[y].length; x++ ) {
            if (screen[y][x] === 'O') {
                result += y+1
            }
        }
    }
    return result;
}


const solve: Solution = (input) => {
    const lines = input.split('\n');
    // const height = lines.length;
    // const width = lines[0].length;

    const screen: Screen = lines.map(l => l.split(''));
    rollUp(screen);
    const first = part1(screen)
    // console.table(rollUp(screen));

    // const rollers: Set<string> = new Set();
    // const blocks: Set<string> = new Set();

    // for ( let y = 0; y < height; y ++) {
    //     for ( let x = 0; x < width; x ++) {
    //         const c = lines[y][x];
    //         if (c === 'O') {
    //             rollers.add(toKey(x, y));
    //         }
    //         if (c === '#') {
    //             blocks.add(toKey(x, y));
    //         }
    //     }
    // }


    return (<>
        <div>
            {first}
        </div>
        <div>
        </div>
    </>)
}

export const ParabolicReflectorDish = () => (
    <>
        <h1>Day ?: ParabolicReflectorDish</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
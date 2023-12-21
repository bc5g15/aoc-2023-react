import { PuzzleForm, Solution } from "../PuzzleForm"

const PLOT = '.'.charCodeAt(0);
// const ROCK = '#'.charCodeAt(0);
const START = 'S'.charCodeAt(0);

const findStart = (maze: number[][]) => {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[0].length; x++) {
            if (maze[y][x] === START) {
                return [x, y];
            }
        }
    }
    return [-1, -1];
}

const DELTAS: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1]
];

const negativeMod = (value: number, mod: number) => {
    const n = value % mod;
    return n < 0 ? mod + n : n; 
}

const walk = (maze: number[][]) => {
    const positions: Set<string> = new Set();
    const [sx, sy] = findStart(maze);
    const nodes: [number, number, number][] = [[sx, sy, 0]];
    const visited: Set<string> = new Set();

    while (nodes.length > 0) {
        const node = nodes.shift()!;
        if (visited.has(node.join(','))) {
            continue;
        }

        visited.add(node.join(','));
        const [x, y, steps] = node;

        if (steps === 64) {
            positions.add([x,y].join(','));
            continue;
        }

        DELTAS.forEach(([dx, dy]) => {
            const c = maze?.[y+dy]?.[x+dx];
            if (c && (c===PLOT || c===START)) {
                nodes.push([x+dx, y+dy, steps+1]);
            }
        })
    }

    return positions.size;
}

const walkInfinite = (maze: number[][]) => {
    const positions: Set<string> = new Set();
    const height = maze.length;
    const width = maze[0].length;
    const [sx, sy] = findStart(maze);
    const nodes: [number, number, number][] = [[sx, sy, 0]];
    const visited: Set<string> = new Set();

    while (nodes.length > 0) {
        const node = nodes.shift()!;
        if (visited.has(node.join(','))) {
            continue;
        }

        visited.add(node.join(','));
        const [x, y, steps] = node;

        if (steps === 5000) {
            positions.add([x,y].join(','));
            continue;
        }

        DELTAS.forEach(([dx, dy]) => {
            const c = maze[negativeMod(y+dy, height)][negativeMod(x+dx, width)];
            if (c && (c===PLOT || c===START)) {
                nodes.push([x+dx, y+dy, steps+1]);
            }
        })
    }

    return positions.size;
}

const solve: Solution = (input) => {
    const maze = input.split('\n').map(l => l.split('').map(c => c.charCodeAt(0)));
    const part1 = walk(maze);
    const part2 = walkInfinite(maze);

    return (<>
        <div>
            {part1}
        </div>
        <div>
            {part2}
        </div>
    </>)
}

export const StepCounter = () => (
    <>
        <h1>Day 21: Step Counter</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
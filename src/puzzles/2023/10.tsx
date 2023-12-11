import { PuzzleForm, Solution } from "../PuzzleForm"

// Using binary exit theory
// Up - Right - Down - Left
// 0000 - No exits
// 1100 - Up - Right
// 1010 - Up - Down
// 1001 - Up - Left 
/// (You get the idea...)
// Consider S as having all exits until we figure it out
const inputCharMap: Record<string, number> = {
    // '.': 0,
    '|': 0b1010,
    '-': 0b0101,
    'L': 0b1100,
    'J': 0b1001,
    '7': 0b0011,
    'F': 0b0110,
    'S': 0b1111
};

const UP =      0b1000;
const RIGHT =   0b0100;
const DOWN =    0b0010;
const LEFT =    0b0001;


const directionDeltas: Record<number, [number, number]> = {
    [UP]: [0, -1],
    [RIGHT]: [1, 0],
    [DOWN]: [0, 1],
    [LEFT]: [-1, 0]
};

const directionOpposites: Record<number, number> = {
    [UP]: DOWN,
    [LEFT]: RIGHT,
    [DOWN]: UP,
    [RIGHT]: LEFT
}

const followPipe = (sx: number, sy: number, direction: number, maze: Map<string, number>) => {
    let x = sx;
    let y = sy;
    let current = maze.get(`${x},${y}`)!;
    let steps = 1;
    const path: [number, number, number][] = [];
    let prevDir = direction;
    const destination = 0b1111;

    while (current !== destination) {
        path.push([x, y, steps]);
        const nextDir = current ^ directionOpposites[prevDir];
        const [ndx, ndy] = directionDeltas[nextDir];
        x += ndx; y+=ndy;
        prevDir = nextDir;
        if (!maze.has(`${x},${y}`)) return [] // Dead end
        current = maze.get(`${x},${y}`)!
        steps += 1;
    }
    return path;
}

const findLoops = (start: [number, number], maze: Map<string, number>) => {
    const [sx, sy] = start;
    // const startNode = maze.get(`${sx},${sy}`)!
    const results = [];

    // Check the four directions. 
    const directions = [UP, RIGHT, DOWN, LEFT];

    for (const dir of directions) {
        const [dx, dy] = directionDeltas[dir];
        const dIndex = `${sx+dx},${sy+dy}`
        if (!maze.has(dIndex) || (maze.get(dIndex)! & directionOpposites[dir]) === 0) continue;

        const path = followPipe(sx+dx, sy+dy, dir, maze);
        if (path) {
            results.push(path);
        }

    }

    return results;
}

const solve: Solution = (input) => {
    const charArray = input.split('\n').map(l => l.split(''));
    const pipeMap: Map<string, number> = new Map();
    let startX = 0;
    let startY = 0;
    for (let y = 0; y < charArray.length; y++) {
        for (let x = 0; x < charArray[y].length; x++) {
            if (charArray[y][x] in inputCharMap) {
                if (charArray[y][x] === 'S') {
                    startX = x;
                    startY = y;
                }
                pipeMap.set(`${x},${y}`, inputCharMap[charArray[y][x]])
            }
        }
    }

    const loops = findLoops([startX, startY], pipeMap);
    const value = loops[0][Math.floor(loops[0].length/2)][2]

    return (<>
        <div>
            {value}
        </div>
        <div>
        </div>
    </>)
}

export const PipeMaze = () => (
    <>
        <h1>Day 10: Pipe Maze</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
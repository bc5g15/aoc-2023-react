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

// 6799 - Too Low

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

const checkExits = (exits: number) => {
    const results: [number, number, number][] = [];
    if (exits & UP)     results.push([0, -1, DOWN])
    if (exits & RIGHT)  results.push([1, 0, LEFT])
    if (exits & DOWN)   results.push([0, 1, UP])
    if (exits & LEFT)   results.push([-1, 0, RIGHT])
    return results;
}

const walkMaze = (start: [number, number], maze: Map<string, number>) => {
    const [sx, sy] = start;
    const nodes: [number, number, number, number][] = [[sx, sy, 0, 0]];
    const visited: Map<string, number> = new Map();
    const points: number[] = [];

    while (nodes.length > 0) {
        const [x, y, steps, fromDir] = nodes.pop()!;
        const index = `${x},${y}`;
        if (!maze.has(index)) continue;

        if (visited.has(index)) {
            points.push(Math.min(steps, visited.get(index)!))
            continue;
        }
        visited.set(index, steps)

        const exits = maze.get(index)!;
        
        const deltas = checkExits(exits ^ fromDir);
        for (const [dx, dy, from] of deltas) {
            const dIndex = `${x+dx},${y+dy}`;
            if (!maze.has(dIndex)) continue;
            nodes.unshift([x+dx, y+dy, steps+1, from])
        }
    }

    console.log(points);
    return Math.max(...points);
}

const findLoops = (start: [number, number], maze: Map<string, number>) => {
    const [sx, sy] = start;
    const startNode = maze.get(`${sx},${sy}`)!

    // Check the four directions. 
    const directions = [UP, RIGHT, DOWN, LEFT];

    for (const dir of directions) {
        const [dx, dy] = directionDeltas[dir];
        const dIndex = `${sx+dx},${sy+dy}`
        if (!maze.has(dIndex) || (maze.get(dIndex)! & directionOpposites[dir]) === 0) continue;

        // Walk the loop
        let x = sx+dx;
        let y = sy+dy;
        let current = maze.get(dIndex)!;
        let steps = 1;
        const path = []
        let prevDir = dir;

        // How do I sensibly break out of this when I hit a dead end? Might need its own function
        while (current !== startNode) {
            path.push([x, y, steps]);
            const nextDir = current ^ directionOpposites[prevDir];
            const [ndx, ndy] = directionDeltas[nextDir];
            x += ndx; y+=ndy;
            prevDir = nextDir;
            current = maze.get(`${x},${y}`)!
            steps += 1;
        }

    }
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
    return (<>
        <div>
            {walkMaze([startX, startY], pipeMap)}
        </div>
        <div>
        </div>
    </>)
}

export const PipeMaze = () => (
    <>
        <h1>Day ?: Name</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
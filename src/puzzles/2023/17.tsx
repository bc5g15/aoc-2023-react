import { PuzzleForm, Solution } from "../PuzzleForm"

type Direction = 'left' | 'up' | 'right' | 'down';

const opposites: Record<Direction, Direction> = {
    'right': 'left',
    'up': 'down',
    'left': 'right',
    'down': 'up'
};

const findPath = (maze: number[][]) => {
    const start = [0, 0];
    const width = maze[0].length;
    const height = maze.length;
    const end = [width-1, height-1];

    let bestScore = Number.MAX_SAFE_INTEGER;

    const nodes: [number, number, number, number, Direction, number][] = [[0, 0, 0, end[0]+end[1], 'down', 0]];

    while (nodes.length > 0) {
        // console.log(nodes);
        const [x, y, score, distance, dir, dirCount] = nodes.pop()!;
        console.log(distance);
        if (score > bestScore) continue;

        if (x === end[0] && y === end[1]) {
            bestScore = Math.min(bestScore, score)
            console.log(bestScore);
            continue;
        }

        if (x < width-1 && !(dir === 'right' && dirCount >= 3) && dir !== 'left') {
            nodes.push([x+1, y, score+maze[y][x+1], distance-1, 'right', dir === 'right' ? dirCount+1 : 1])
        }

        if (x > 0 && dir !== 'right' && !(dir === 'left' && dirCount >= 3)) {
            nodes.push([x-1, y, score+maze[y][x-1], distance+1, 'left', dir==='left' ? dirCount + 1: 1]);
        }

        if (y < height-1 && dir !== 'up' && !(dir === 'down' && dirCount >= 3)) {
            nodes.push([x, y+1, score+maze[y+1][x], distance-1, 'down', dir==='down' ? dirCount+1: 1]);
        }

        if (y > 0 && dir !== 'down' && !(dir === 'up' && dirCount >= 3)) {
            nodes.push([x, y-1, score+maze[y-1][x], distance+1, 'up', dir==='up' ? dirCount+1: 1]);
        }
        // Make sure to get the lowest distances first
        nodes.sort((a, b) => (b[3]) - (a[3]));
    }
    return bestScore;
}

const solve: Solution = (input) => {
    const maze = input.split('\n').map(l => l.split('').map(c => parseInt(c)));
    const part1 = findPath(maze)
    return (<>
        <div>
            {part1}
        </div>
        <div>
        </div>
    </>)
}

export const ClumsyCrucible = () => (
    <>
        <h1>Day 17: Clumsy Crucible</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
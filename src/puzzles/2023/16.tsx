import { PuzzleForm, Solution } from "../PuzzleForm"

type Direction = 'up' | 'left' | 'down' | 'right'

const deltas: Record<Direction, [number, number]> = {
    'up': [0, -1],
    'down': [0, 1],
    'right': [1, 0],
    'left': [-1, 0]
}

const toKey = (...numbers: number[]) => numbers.join(',');

const lightBeam = (maze: string[][], start: [number, number, Direction] = [0, 0, 'right']) => {
    const nodes: [number, number, Direction][] = [start]
    const height = maze.length;
    const width = maze[0].length;
    const visited: Set<string> = new Set();
    visited.add([start[0], start[1]].join(','));
    const doubleVisited: Set<string> = new Set();

    while (nodes.length > 0) {
        const [x, y, dir] = nodes.pop()!;
        const [dx, dy] = deltas[dir];
        // console.log(nodes.length);

        // Check if it is an illegal space
        if (x+dx < 0 || x+dx>=width || y+dy<0 || y+dy>=height || doubleVisited.has([x,y,dir].join(','))) continue;
        const rx = x + dx;
        const ry = y + dy;
        const cell = maze[ry][rx];
        doubleVisited.add([x,y,dir].join(','));

        if (cell === '.') {
            nodes.push([rx, ry, dir]);
            visited.add(toKey(rx, ry));
            continue;
        }

        if (cell === '/') {
            if (dir === 'right') nodes.push([rx, ry, 'up']);
            if (dir === 'down') nodes.push([rx, ry, 'left']);
            if (dir === 'left') nodes.push([rx, ry, 'down']);
            if (dir === 'up') nodes.push([rx, ry, 'right'])
            visited.add(toKey(rx, ry));
            continue;
        }

        if (cell === '\\') {
            if (dir === 'right') nodes.push([rx, ry, 'down']);
            if (dir === 'up') nodes.push([rx, ry, 'left']);
            if (dir === 'left') nodes.push([rx, ry, 'up']);
            if (dir === 'down') nodes.push([rx, ry, 'right']);
            visited.add(toKey(rx, ry));
            continue;
        }

        if (cell === '|') {
            visited.add(toKey(rx, ry));
            if (dir === 'right' || dir === 'left') {
                nodes.push([rx, ry, 'down']);
                nodes.push([rx, ry, 'up']);
                continue;
            } else {
                nodes.push([rx, ry, dir]);
                continue;
            }
        }

        if (cell === '-') {
            visited.add(toKey(rx, ry));
            if (dir === 'up' || dir === 'down') {
                nodes.push([rx, ry, 'left']);
                nodes.push([rx, ry, 'right']);
                continue;
            } else {
                nodes.push([rx, ry, dir]);
                continue;
            }
        }
    }
    return visited.size;
}

const part2 = (maze: string[][]) => {
    const starts: [number, number, Direction][] = [];

    const xmax = maze[0].length-1;
    const ymax = maze.length-1;

    for (let y = 0; y <= ymax; y++) {
        starts.push([0, y, 'right']);
        starts.push([xmax, y, 'left']);
    }

    for (let x = 0; x <= xmax; x++) {
        starts.push([x, 0, 'down']);
        starts.push([x, ymax, 'up']);
    }


    return Math.max(...starts.map(s => lightBeam(maze, s)));
}

const solve: Solution = (input) => {
    const maze = input.split('\n').map(l => l.split(''));
    const part1 = lightBeam(maze);
    const p2 = part2(maze);
    return (<>
        <div>
            {part1}
        </div>
        <div>
            {p2}
        </div>
    </>)
}

export const LavaFloor = () => (
    <>
        <h1>Day ?: The Floor Will Be Lava</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
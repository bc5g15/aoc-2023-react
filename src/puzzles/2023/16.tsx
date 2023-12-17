import { PuzzleForm, Solution } from "../PuzzleForm"

type Direction = 'up' | 'left' | 'down' | 'right'

const deltas: Record<Direction, [number, number]> = {
    'up': [0, -1],
    'down': [0, 1],
    'right': [1, 0],
    'left': [-1, 0]
}

const toKey = (...numbers: number[]) => numbers.join(',');

const lightBeam = (maze: string[][]) => {
    const nodes: [number, number, Direction][] = [[0, 0, 'right']]
    const height = maze.length;
    const width = maze[0].length;
    const visited: Set<string> = new Set(['0,0']);
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

const solve: Solution = (input) => {
    const maze = input.split('\n').map(l => l.split(''));
    const part1 = lightBeam(maze);
    return (<>
        <div>
            {part1}
        </div>
        <div>
        </div>
    </>)
}

export const LavaFloor = () => (
    <>
        <h1>Day ?: The Floor Will Be Lava</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
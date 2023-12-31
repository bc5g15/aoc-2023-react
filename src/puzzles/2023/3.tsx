import { PuzzleForm, Solution } from "../PuzzleForm"

const readDiagram = (diagram: string[]) => {
    const numbers = [];

    for (let y = 0; y < diagram.length; y++) {
        const numberMatches = diagram[y].matchAll(/\d+/ug);
        for ( const match of numberMatches) {
            // Check for adjacents
            const minx = Math.max((match?.index ?? 0) -1, 0);
            const maxx = Math.min((match?.index ?? 0) + match[0].length, diagram[y].length-1);
            const miny = Math.max(0, y-1);
            const maxy = Math.min(diagram.length-1, y+1);
            const connectors = [];

            for (let i = miny; i<=maxy; i++) {
                for (let j = minx; j <= maxx; j++) {
                    if (!diagram[i][j].match(/(\d|\.)/u)) {
                        connectors.push({
                            x: j,
                            y: i,
                            symbol: diagram[i][j]
                        })
                    }
                }
            }
            numbers.push({
                x: match.index ?? -1,
                y,
                value: parseInt(match[0]),
                connectors
            })
        }
    }
    return numbers;
}

const calibration: Solution = (input) => {
    const diagram = input.split('\n');
    const numbers = readDiagram(diagram);

    const shared: Map<string, number[]> = new Map();
    numbers.forEach(n => n.connectors.forEach(c => {
            const key = `${c.x},${c.y}`;
            if (shared.has(key)) {
                shared.get(key)?.push(n.value);
            } else {
                shared.set(key, [n.value]);
            }
        }    
    ))

    const part1 = numbers.filter(n => n.connectors.length > 0).reduce((acc, cur) => acc + cur.value, 0);
    const part2 = [...shared.values()].filter(c => c.length === 2).reduce((acc, cur) => acc + (cur[0]*cur[1]), 0)

    return (<>
        <div>
            {part1}
        </div>
        <div>
            {part2}
        </div>
    </>)
}

export const GearRatios = () => (
    <>
        <h1>Day 3: Gear Ratios</h1>
        <PuzzleForm onSolve={calibration} />
    </>
)

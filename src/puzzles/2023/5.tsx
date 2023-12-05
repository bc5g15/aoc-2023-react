import { PuzzleForm, Solution } from "../PuzzleForm"

const buildRange = (destination: number, source: number, length: number) => {
    const condition = (input: number) => (input >= source) && (input < source + length)
    const transform = (input: number) => input + (destination - source)
    return { condition, transform }
}

type MapDetails = {
    destination: string;
    conditions: ((input:number) => boolean)[];
    transforms: ((input: number) => number)[];
}

const buildMaps = (input:string) => {
    // Input Eater
    const lines = input.split('\n');
    const seeds = [...lines[0].matchAll(/\d+/gu)].map(v => parseInt(v[0]));
    // const seedLocations
    let source = '';
    let destination = '';
    let conditions = [];
    let transforms = [];
    const maps: Map<string, MapDetails> = new Map();
    for (let i = 1; i < lines.length; i++) {

        const mapCheck = lines[i].match(/(\w+)-to-(\w+)/u);
        if (mapCheck) {
            source = mapCheck[1];
            destination = mapCheck[2];
            conditions = [];
            transforms = [];
            continue
        }

        const digitCheck = lines[i].match(/(\d+) (\d+) (\d+)/u);
        if (digitCheck) {
            const { transform, condition } = buildRange(parseInt(digitCheck[1]), parseInt(digitCheck[2]), parseInt(digitCheck[3]))
            conditions.push(condition);
            transforms.push(transform)
            continue;
        }

        //Line break, Populate the map
        if (lines[i] === '' && source !== '') {
            maps.set(source, {
                destination,
                conditions,
                transforms
            })
        }
    }
    maps.set(source, {
        destination,
        conditions,
        transforms
    })
    return {
        seeds,
        maps
    }
}

const resolve = (seed: number, maps:Map<string, MapDetails>) => {
    let current = 'seed';
    let value = seed;
    while (current !== 'location') {
        const { destination, conditions, transforms } = maps.get(current)!;
        current = destination;

        const matchingTransform = conditions.findIndex(f => f(value));
        if (matchingTransform === -1) continue;

        value = transforms[matchingTransform](value)
    }
    return value;
}

const solve: Solution = (input) => {
    const { seeds, maps } = buildMaps(input);

    console.log(seeds.map(s => resolve(s, maps)));
    const part1Locations = seeds.map(s => resolve(s, maps));

    return (<>
        <div>
            {Math.min(...part1Locations)}
        </div>
        <div>
        </div>
    </>)
}

export const AlmanacReader = () => (
    <>
        <h1>Day 5: If You Give A Seed A Fertilizer</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
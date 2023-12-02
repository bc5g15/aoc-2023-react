import { PuzzleForm, Solution } from "../PuzzleForm"
import { sum } from "../helpers";

const readColours = (round: string) => {
    const results = {
        red: 0,
        blue: 0,
        green: 0
    };

    const reds = round.match(/(\d+) red/u);
    const blues = round.match(/(\d+) blue/u);
    const greens = round.match(/(\d+) green/u);

    if (reds) {
        results.red = parseInt(reds[1])
    }

    if (blues) {
        results.blue = parseInt(blues[1])
    }

    if (greens) {
        results.green = parseInt(greens[1])
    }

    return results;
}

type Game = {
    id: number;
    colours: {
        red: number;
        blue: number;
        green: number;
    }[]
}

const maxLimit = (game: Game) => {
    return game.colours.reduce((acc, cur) => {
        return {
            red: Math.max(acc.red, cur.red),
            blue: Math.max(acc.blue, cur.blue),
            green: Math.max(acc.green, cur.green)
        }
    })
}


const calibration: Solution = (input) => {

    const lines = input.split('\n').map(line => {
        const result = /Game (?<game>\d+): (?<rounds>.+)/u.exec(line)?.groups;
        const colours = (result?.['rounds'] ?? '').split(';').map(readColours);
        return {
            id: parseInt(result?.['game'] ?? '0'),
            colours
        }
    })

    const validGames = lines.filter((game) => {
        const maxes = maxLimit(game);
        return maxes.red <= 12 && maxes.green <= 13 && maxes.blue <= 14;
    })

    const part1 = validGames.reduce((acc, { id }) => acc + id, 0)

    const powers = lines.map(line => {
        const { red, blue, green } = maxLimit(line);
        return red * blue * green;
    });

    const part2 = sum(powers);

    return (<>
        <div>{part1}</div>
        <div>{part2}</div>
    </>)
}

export const CubeConundrum = () => (
    <>
        <h1>Day 2: Cube Conundrum</h1>
        <PuzzleForm onSolve={calibration} />
    </>
)
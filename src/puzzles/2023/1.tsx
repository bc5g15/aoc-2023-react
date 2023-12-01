import { PuzzleForm, Solution } from "../PuzzleForm"
import { sum } from "../helpers";

const digitValues: Map<string, number> = new Map([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9]
])

const charValue = (digit: string): number => {
    if (digitValues.has(digit)) {
        return digitValues.get(digit) ?? 0;
    }
    return parseInt(digit);
}

const calibration: Solution = (input) => {
    const lines = input.split('\n').map(line => {
        const relevant = line.replace(/[^0-9]/gu, '');
        const firstChar = relevant[0];
        const lastChar = relevant[relevant.length-1];
        return parseInt(`${firstChar}${lastChar}`);
    });

    const partTwoLines = input.split('\n').map(line => {
        const first = charValue(line.match(/[0-9]|(one|two|three|four|five|six|seven|eight|nine)/u)?.[0] ?? '0');
        const last = [...line].reverse().join('').match(/[0-9]|(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/u)?.[0] ?? '0';
        const lastValue = charValue([...last].reverse().join(''));
        return parseInt(`${first}${lastValue}`);
    });

    return (<>
        <div>
            Part One: 
            {sum(lines)}
        </div>
        <div>
            Part Two:
            {sum(partTwoLines)}
        </div>
    </>)
}

export const Trebuchet = () => (
    <>
        <h1>Day 1: Trebuchet?!</h1>
        <PuzzleForm onSolve={calibration} />
    </>
)
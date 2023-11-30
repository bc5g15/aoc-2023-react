import { Solution, PuzzleForm } from "../PuzzleForm"
import { sum } from "./helpers";

const WrappingSurface: Solution = (input) => {
    let totalPaper = 0;
    let totalRibbon = 0;

    const lines = input.split('\n');
    lines.forEach(line => {
        const [l,w,h] = line.split('x').map(i => Number(i));
        const sides = [l*w, w*h, l*h];
        const smallestSide = Math.min(...sides);

        totalPaper += sum(sides.map(v => v*2)) + smallestSide;
        totalRibbon += ribbon(l,w,h);
    });
    

    return (<>
        <div>Total Paper: {totalPaper}</div>
        <div>Total Ribbon: {totalRibbon}</div>
    </>)
}

const ribbon = (l: number, w: number, h: number) => {
    const smallestPerimeter = Math.min(...[2*l+2*w, 2*l+2*h, 2*w+2*h]);
    const bow = l*w*h;

    return bow + smallestPerimeter;
}

export const IWasToldThereWouldBeNoMath = () => {
    return (
        <>
            <h1>I Was Told There Would Be No Math</h1>
            <PuzzleForm onSolve={WrappingSurface} />
        </>
    )
}
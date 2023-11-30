import { PuzzleForm, Solution } from "../PuzzleForm"

const floorNavigate: Solution = (input) => {
    let floor = 0;
    let basementTurn = 0;
    let readBasement = true;


    for (let i = 0; i < input.length; i++) {
        const c = input.charAt(i);
        if (c === '(') {
            floor++;
        }
        if (c === ')') {
            floor--;
        }
        if (floor === -1 && readBasement) {
            basementTurn = i+1;
            readBasement = false;
        }
    }

    return (<>
        <div>Final Floor: {floor}</div>
        <div>Basement Turn: {basementTurn}</div>
    </>);
}

export function NotQuiteLisp() {
    return (
        <>
            <h1>Not Quite Lisp</h1>
            <PuzzleForm onSolve={floorNavigate} />
        </>
    )
}
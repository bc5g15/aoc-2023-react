import { PuzzleForm, Solution } from "../PuzzleForm"

const solve: Solution = (input) => {
    return (<>
        <div>
            {input}
        </div>
        <div>
        </div>
    </>)
}

export const HauntedWasteland = () => (
    <>
        <h1>Day 8: Haunted Wasteland</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
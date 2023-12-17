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

export const ClumsyCrucible = () => (
    <>
        <h1>Day 17: Clumsy Crucible</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
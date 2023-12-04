import { PuzzleForm, Solution } from "./PuzzleForm"

const solve: Solution = (input) => {
    return (<>
        <div>
            {input}
        </div>
        <div>
        </div>
    </>)
}

export const Template = () => (
    <>
        <h1>Day ?: Name</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
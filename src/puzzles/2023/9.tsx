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

export const MirageMaintenance = () => (
    <>
        <h1>Day 9: Mirage Maintenance</h1>
        <PuzzleForm onSolve={solve} />
    </>
)

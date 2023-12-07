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

export const CamelCards = () => (
    <>
        <h1>Day 7: Camel Cards</h1>
        <PuzzleForm onSolve={solve} />
    </>
)
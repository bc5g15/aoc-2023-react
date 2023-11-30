import { PuzzleForm } from "./PuzzleForm";

export function Template() {
    
    return (<>
        <h1>My example puzzle template</h1>
        <PuzzleForm 
            onSolve={(text) => (<div>{text}</div>)}
        />
    </>)
}
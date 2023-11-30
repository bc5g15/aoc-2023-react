import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
export function Root() {
    return (
        <div style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,3fr)',
            paddingLeft: '1rem',
            paddingRight: '1rem'
        }}>
            <div id='sidebar' style={{
                padding: '1rem',
                borderRight: 'solid 1px #e3e3e3',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h2>Puzzles</h2>
                <Navbar />
            </div>
            <div id='detail'>
                <Outlet />
            </div>
        </div>
    )
}
import { NavLink, NavLinkProps} from 'react-router-dom';
import { FC } from 'react';
import { puzzleIndex } from './puzzles/2023/puzzleIndex';

const StyleLink: FC<NavLinkProps> = ({ children, to }) => {
    return (
        <NavLink to={to} style={({ isActive }) => ({
            fontWeight: isActive ? 'bolder' : '',
        })}>
            {children}
        </NavLink>
    )
}

export function Navbar() {
    return (
        <>
            {...puzzleIndex.map(({name}, index) => (
                <StyleLink key={`2023-${index}`} to={`2023/${index+1}`}>
                    {name}
                </StyleLink>
            ))}
        </>
    )
}
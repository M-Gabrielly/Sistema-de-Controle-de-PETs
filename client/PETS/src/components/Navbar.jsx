import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav id="navbar">
            <ul>
                <li>
                    <NavLink 
                    to={'/'}
                    end
                    className={({ isActive }) => isActive ? 'active' : ''}
                    > Pet's </NavLink>
                </li>
                <li>
                    <NavLink 
                    to={'/Novo'}
                    className={({ isActive }) => isActive ? 'active' : ''}
                    > Cadastrar PET </NavLink>
                </li>
                <li>
                    <NavLink 
                    to={'/Usuario'}
                    className={({ isActive }) => isActive ? 'active' : ''}
                    > Usuário </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
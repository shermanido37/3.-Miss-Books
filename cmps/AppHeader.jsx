
const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return <header>
        <h1>Miss Books</h1>
        <nav>
            <i className="fa-solid fa-house"></i><NavLink to="/">Home </NavLink> |
            <i className="fa-solid fa-book"></i><NavLink to="/book">Books </NavLink> |
            <i className="fa-solid fa-address-card"></i><NavLink to="/about">About</NavLink>
        </nav>
    </header>
}
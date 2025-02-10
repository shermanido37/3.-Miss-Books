const { NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Starter Proj</h1>
                {/* <NavLink to="/">Home</NavLink>
                <NavLink to="/About">About</NavLink>
                <NavLink to="/Books">Books</NavLink> */}
            </section>
        </header>
    )
}

const { Link, Outlet } = ReactRouterDOM

export function AboutUs() {
    return <section className='about'>
        <h2>About</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Sapiente, corporis!
        </p>
        <nav>
            <Link to='/about/Team'><i className="fa-solid fa-people-group"></i> Team</Link>
            <Link to='/about/Goal'><i className="fa-brands fa-golang"></i>al</Link>
        </nav>
        <Outlet />
    </section>
}
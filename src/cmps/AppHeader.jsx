import { NavLink, Link } from "react-router"

export function AppHeader(){
    return (
        <section className="app-header-container">
            <Link className='misstoys-logo' to='/'><h1 >missToys</h1></Link>
            <nav>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/toy'>Toys</NavLink>
            </nav>
        </section>
    )
}
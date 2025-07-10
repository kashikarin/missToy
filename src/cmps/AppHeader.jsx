import { NavLink, Link } from "react-router"
import { ThemeSwitcher } from "./ThemeSwitcher"

export function AppHeader(){



    return (
        <section className="app-header-container full">
            <Link className='misstoys-logo'to='/'><h1 >missToys</h1></Link>
            <div className="nav-container">
                <nav>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/toy'>Toys</NavLink>
                </nav>
                <div className="theme-switcher-wrapper">
                    <ThemeSwitcher />   
                </div>
            </div> 
        </section>

    )
}
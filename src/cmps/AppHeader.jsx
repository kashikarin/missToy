import { NavLink, Link } from "react-router"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { useRef, useEffect } from "react"

export function AppHeader(){
    const headerRef = useRef()
    
    useEffect(() => {
        const headerEl = headerRef.current
        if (!headerEl) return
        const height = headerEl.offsetHeight
        document.documentElement.style.setProperty('--header-height', `${height}px`)
        
        const handleResize = () => {
            if (headerEl) {
                document.documentElement.style.setProperty('--header-height', `${headerEl.offsetHeight}px`)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }, [headerRef])

    return (
        <header className="app-header-container full" ref={headerRef}>
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

        </header>

    )
}
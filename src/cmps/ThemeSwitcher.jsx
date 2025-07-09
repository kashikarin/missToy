import { useState } from "react"

export function ThemeSwitcher(){
    const [colorTheme, setColorTheme] = useState('light')
    const body = document.body

    function switchTheme(){
        if (colorTheme === 'light') {
           setColorTheme('dark')
           body.classList.add('dark')
        } else {
            setColorTheme('light')
            body.classList.remove('dark')
        }
    }

    return(
        <div className="theme-switcher-container" onClick={switchTheme}>
            <span className="theme-switcher-toggle-text">{(colorTheme === 'light')? 'Light Mode' : 'Dark Mode'}</span>
            {(colorTheme === 'light')? <i className="fas fa-sun"></i> : <i className="fa fa-moon"></i>}

        </div>
    )
}



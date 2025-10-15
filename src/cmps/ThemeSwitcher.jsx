import { setDarkTheme, setLightTheme } from "../../store/actions/system.actions"
import { useSelector } from "react-redux"

export function ThemeSwitcher(){
    const colorTheme = useSelector(state => state.systemModule.colorTheme)

    function switchTheme(){
        if (colorTheme === 'light') setDarkTheme()
        else setLightTheme()
    }

    return(
        <div className="theme-switcher-container" onClick={switchTheme}>
            <span className="theme-switcher-toggle-text">{(colorTheme === 'light')? 'Light Mode' : 'Dark Mode'}</span>
            {(colorTheme === 'light')? <i className="fas fa-sun"></i> : <i className="fa fa-moon"></i>}
        </div>
    )
}



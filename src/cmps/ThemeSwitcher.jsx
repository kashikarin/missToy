import { SET_COLOR_THEME } from "../../store/reducers/system.reducer"
import { useSelector, useDispatch } from "react-redux"

export function ThemeSwitcher(){
    const body = document.body
    const colorTheme = useSelector(state => state.systemModule.colorTheme)
    const dispatch = useDispatch()

    function switchTheme(){
        if (colorTheme === 'light') {
           dispatch({type: SET_COLOR_THEME, colorTheme: 'dark'})
           body.classList.add('dark')
        } else {
            dispatch({type: SET_COLOR_THEME, colorTheme: 'light'})
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



import { SET_COLOR_THEME, SET_DESKTOP, SET_ISLOADING, SET_MOBILE } from "../reducers/system.reducer";
import { store } from "../store";

export function setWideScreen(){
    store.dispatch(getCmdSetDesktop())    
}

export function setNarrowScreen(){
    store.dispatch(getCmdSetMobile())    
}

export function setLoading(){
    store.dispatch(getCmdSetIsLoading(true))
}

export function setNotLoading(){
    store.dispatch(getCmdSetIsLoading(false))
}

export function setDarkTheme(){
    store.dispatch(getCmdSetColorTheme('dark'))
    document.body.classList.add('dark')
}

export function setLightTheme(){
    store.dispatch(getCmdSetColorTheme('light'))
    document.body.classList.remove('dark')
}

//comand creators
function getCmdSetIsLoading(isLoading) {
  return {
    type: SET_ISLOADING,
    isLoading
  }
}

function getCmdSetColorTheme(colorTheme) {
  return {
    type: SET_COLOR_THEME,
    colorTheme
  }
}

function getCmdSetMobile() {
    return {
        type: SET_MOBILE
    }
}

function getCmdSetDesktop() {
    return {
        type: SET_DESKTOP
    }
}
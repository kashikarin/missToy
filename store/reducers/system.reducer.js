export const SET_COLOR_THEME = 'SET_COLOR_THEME'
export const SET_ISLOADING = 'SET_ISLOADING'
export const SET_MOBILE = 'SET_MOBILE'
export const SET_DESKTOP = 'SET_DESKTOP'

const initialState = {
    colorTheme: '',
    isLoading: false,
    isMobile: window.innerWidth < 1000
}

export function systemReducer(state = initialState, cmd){
    switch (cmd.type){
        case SET_COLOR_THEME:
            return {...state, 
                    colorTheme: cmd.colorTheme}
        case SET_ISLOADING:
            return {...state,
                    isLoading: cmd.isLoading
            }
        case SET_MOBILE: 
            return {
                ...state, isMobile: true
            }
        case SET_DESKTOP: 
            return {
                ...state, isMobile: false
            }
        default: return state
    }
}
export const SET_COLOR_THEME = 'SET_COLOR_THEME'


const initialState = {
    colorTheme: 'light',
}

export function userReducer(state = initialState, cmd){
    switch (cmd.type){
        case SET_COLOR_THEME:
            return {...state, 
                    colorTheme: cmd.colorTheme}
    
        default: return state
    }
}
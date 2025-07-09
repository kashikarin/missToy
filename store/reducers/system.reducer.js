export const SET_COLOR_THEME = 'SET_COLOR_THEME'


const initialState = {
    colorTheme: '',
}

export function systemReducer(state = initialState, cmd){
    switch (cmd.type){
        case SET_COLOR_THEME:
            return {...state, 
                    colorTheme: cmd.colorTheme}
    
        default: return state
    }
}
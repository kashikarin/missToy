export const SET_COLOR_THEME = 'SET_COLOR_THEME'
export const SET_ISLOADING = 'SET_ISLOADING'



const initialState = {
    colorTheme: '',
    isLoading: false
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
        default: return state
    }
}
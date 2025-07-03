export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTERSORT = 'SET_FILTERSORT'

const initialState = {
    toys: [],
    filterSort: {}
}

export function toyReducer(state = initialState, cmd){
    switch (cmd.type){
        case SET_TOYS:
            return {...state, 
                    toys: cmd.toys}
        case REMOVE_TOY:
            return {...state,
                    lastToys: [...state.toys], 
                    toys: state.toys.filter(toy => toy._id !== cmd.toyId)}
        case ADD_TOY: 
            return {...state, 
                    toys: [...state.toys, cmd.toy]}
        case UPDATE_TOY:
            return {...state, 
                    toys: state.toys.map(toy => toy._id === cmd.toy._id? cmd.toy : toy)}
        case SET_FILTERSORT:
            return {...state,
                    filterSort: {...state.filterSort, ...cmd.filterSort}}

        default: return state
    }
}
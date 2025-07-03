import { toyService } from "../../services/toy.service";
import { ADD_TOY, REMOVE_TOY, SET_FILTERSORT, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer";
import { store } from "../store";


export async function loadToys(){
    const filterSort = store.getState().toyModule.filterSort
    try {
        const toys = await toyService.query(filterSort)
        store.dispatch({type: SET_TOYS, toys})
    } catch(err){
        console.error('toy actions => failed to load toys', err)
        throw err
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({type: REMOVE_TOY, toyId})
    } catch(err) {
        console.error('toy actions => failed to remove toy', err)
        throw err   
    }
}

export function setFilterSort(filterSort) {
    store.dispatch({ type: SET_FILTERSORT, filterSort })
}

export async function saveToy(toyToSave) {
    try {
        const toy = await toyService.save(toyToSave)
        if (toyToSave._id) {
            store.dispatch({type: ADD_TOY, toy})
        } else {
            store.dispatch({type: UPDATE_TOY, toy})
        }
    } catch(err) {
        console.error('toy actions => failed to save toy', err)
        throw err
    }
}
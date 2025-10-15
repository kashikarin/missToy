import { toyService } from "../../services/toy.service";
import { SET_ISLOADING } from "../reducers/system.reducer";
import { ADD_TOY, REMOVE_TOY, SET_QUERYOPTIONS, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer";
import { store } from "../store";
import { setLoading, setNotLoading } from "./system.actions";


export async function loadToys(queryOptions){
    setLoading()
    try {
        const toys = await toyService.query(queryOptions)
        store.dispatch(getCmdSetToys(toys))
    } catch(err){
        console.error('toy actions => failed to load toys', err)
        throw err
    } finally {
        setNotLoading()

    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch(getCmdRemoveToy(toyId))
    } catch(err) {
        console.error('toy actions => failed to remove toy', err)
        throw err   
    }
}

export function setQueryOptions(queryOptions) {
    store.dispatch(getCmdSetQueryOptions(queryOptions))
}

export async function saveToy(toyToSave) {
    try {
        const toy = await toyService.save(toyToSave)
        if (toyToSave._id) {
            store.dispatch(getCmdAddToy(toy))
        } else {
            store.dispatch(getCmdUpdateToy(toy))
        }
    } catch(err) {
        console.error('toy actions => failed to save toy', err)
        throw err
    }
}


//comand creators
function getCmdSetToys(toys) {
  return {
    type: SET_TOYS,
    toys
  }
}

function getCmdRemoveToy(toyId) {
  return {
    type: REMOVE_TOY,
    toyId
  }
}

function getCmdSetQueryOptions(queryOptions) {
  return {
    type: SET_QUERYOPTIONS,
    queryOptions
  }
}

function getCmdAddToy(toy) {
  return {
    type: ADD_TOY,
    toy
  }
}

function getCmdUpdateToy(toy) {
  return {
    type: UPDATE_TOY,
    toy
  }
}

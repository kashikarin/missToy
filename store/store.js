import { systemReducer } from "./reducers/system.reducer.js"
import { toyReducer } from "./reducers/toy.reducer.js"
import {createStore, combineReducers, compose} from 'redux'

const rootReducer = combineReducers({
    toyModule: toyReducer,
    systemModule: systemReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = createStore(rootReducer, composeEnhancers())

console.log('store:', store.getState())

store.subscribe(()=>{
    console.log('current state is:', store.getState())
})
import {createStore, combineReducers} from 'redux'
import currentItem from './reducers/currentItem'


const reducer = combineReducers({
    currentItem
})

//podemos agregar los middleware aquí
const store = createStore(reducer)

export default store
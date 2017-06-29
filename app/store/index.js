/**
 * Created by Alex on 2017/6/29.
 */
import bookContainer from '../reducers'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

export const store = createStore(bookContainer, applyMiddleware(thunk));
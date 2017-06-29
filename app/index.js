/**
 * Created by Alex on 2017/6/21.
 */
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import{render} from 'react-dom'
import React from 'react'
import BookContainer from './components/BookContainer'
import OpernPanel from './components/show-operns/OpernPanel'
import Header from './components/Header/Header'
import {Provider} from 'react-redux'
import {bookContainerLoaded} from './actions'
import axios from 'axios'
import './scss/main.scss'
import {store} from './store/index'

window.onload = function () {
    render(
        <Provider store={store}>
            <Router>
                <div>
                    <Route component={Header}/>
                    <Switch>
                        <Route exact path="/" component={BookContainer}/>
                        <Route path="/opernList"  component={OpernPanel}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
        ,
        document.getElementById('root'));
    axios.get('/api/pc/book_list').then(data => {
        store.dispatch(bookContainerLoaded(data.data))
    });
};
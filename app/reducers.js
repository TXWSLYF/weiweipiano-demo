/**
 * Created by Alex on 2017/6/21.
 */
import {combineReducers} from 'redux'
import {
    DELETE_BOOK,
    HIDE_PANEL,
    ADD_BOOK,
    EDIT_BOOK,
    ON_CLICK_ADD,
    ON_CLICK_EDIT,
    BOOK_CONTAINER_LOADED,
    SAVE_OPERN_LIST,
    CLEAR_OPERN_LIST,
} from './actions'


//保存书籍信息
function books(state = [], action) {
    switch (action.type) {
        case BOOK_CONTAINER_LOADED: {
            return [...action.data.data];
        }
        default: {
            return state
        }
    }
}

function addBookPanelVisible(state = false, action) {
    switch (action.type) {
        case ON_CLICK_ADD:
        case ON_CLICK_EDIT: {
            return true
        }
        case HIDE_PANEL: {
            return false
        }
        case ADD_BOOK:
        case BOOK_CONTAINER_LOADED:
        case EDIT_BOOK: {
            return false
        }

        default: {
            return state
        }
    }
}

function addOrEdit(state = {
    add: false,
    edit: false,
    editBook: {}
}, action) {
    switch (action.type) {
        case ON_CLICK_EDIT: {
            return Object.assign({}, state, {edit: true}, {editBook: action.editBook})
        }
        case ON_CLICK_ADD: {
            return Object.assign({}, state, {add: true})
        }
        case ADD_BOOK:
        case BOOK_CONTAINER_LOADED:
        case EDIT_BOOK:
        case HIDE_PANEL: {
            return Object.assign({}, state, {
                add: false,
                edit: false,
                editBook: {}
            })
        }
        default: {
            return state
        }
    }
}


function opernList(state = [], action) {
    switch (action.type) {
        case SAVE_OPERN_LIST: {
            return [...action.opernList.data]
        }
        case CLEAR_OPERN_LIST: {
            return []
        }
        default: {
            return state
        }
    }
}


const bookContainer = combineReducers({
    books,
    addBookPanelVisible,
    addOrEdit,
    opernList,
});

export default bookContainer;
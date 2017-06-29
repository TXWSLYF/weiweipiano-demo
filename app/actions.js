/**
 *
 * Created by Alex on 2017/6/21.
 */

import axios from 'axios'

// action类型
export const HIDE_PANEL = 'HIDE_PANEL';

export const DELETE_BOOK = 'DELETE_BOOK';
export const ADD_BOOK = 'ADD_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';

export const ON_CLICK_EDIT = 'ON_CLICK_EDIT';
export const ON_CLICK_ADD = 'ON_CLICK_ADD';

export const BOOK_CONTAINER_LOADED = 'BOOK_CONTAINER_LOADED';

export const SAVE_OPERN_LIST = 'SAVE_OPERN_LIST';
export const CLEAR_OPERN_LIST = 'CLEAR_OPERN_LIST';

//action创建函数
export function deleteBook(id) {
    return function (dispatch) {
        // delete方法需要传递普通的对象即可
        return axios({
            method: 'delete',
            url: '/api/pc/book',
            data: id,
        }).then(response => {
            if (response.msg !== '成功') {
                return false
            }
        }).then(response => {
            axios.get('/api/pc/book_list')
                .then(data => {
                    dispatch(bookContainerLoaded(data.data))
                })
        })
    }
}

export function editBook(newBook) {
    return function (dispatch) {
        return axios.post('/api/pc/book', newBook)
            .then(response => {
                if (response.msg !== '成功') {
                    return false
                }
            })
            .then(response => {
                axios.get('/api/pc/book_list')
                    .then(data => {
                        dispatch(bookContainerLoaded(data.data))
                    })
            })
    }
}

export function hidePanel() {
    return {type: HIDE_PANEL}
}

// export function addBook(book) {
//     return {type: ADD_BOOK, book}
// }

export function addBook(book) {
    return function (dispatch) {
        dispatch(hidePanel());
        return axios.post('/api/pc/book', book)
            .then(response => {
                if (response.msg !== '成功') {
                    return false;
                }
            }).then(
                response => {
                    axios.get('/api/pc/book_list')
                        .then(data => {
                            dispatch(bookContainerLoaded(data.data))
                        })
                }
            )
    }
}

export function onClickAdd() {
    return {type: ON_CLICK_ADD}
}

export function onClickEdit(editBook) {
    return {type: ON_CLICK_EDIT, editBook}
}

export function bookContainerLoaded(data) {
    return {type: BOOK_CONTAINER_LOADED, data}
}

//异步加载opernList，需要引入redux-thunk
export function showOpernList(bookId) {
    return function (dispatch) {
        return axios.get('/api/pc/opern_list?bookId=' + bookId)
            .then(data => {
                dispatch(saveOpernList(data.data))
            })
    }
}

export function saveOpernList(opernList) {
    return {type: SAVE_OPERN_LIST, opernList}
}

export function clearOpernList() {
    return {type: CLEAR_OPERN_LIST}
}



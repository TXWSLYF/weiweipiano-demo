/**
 * Created by Alex on 2017/6/21.
 */

import React from 'react'
import {connect} from 'react-redux'
import {
    deleteBook,
    hidePanel,
    addBook,
    editBook,
    onClickAdd,
    onClickEdit,
    showOpernList,
} from '../actions'
import {Row, Col} from 'antd'
import Book from './Book'
import AddBook from './AddBook'
import AddAndEditPanel from './UpLoad/AddAndEditPanel'


class BookContainer extends React.Component {

    render() {
        const {dispatch, books, addBookPanelVisible, addOrEdit} = this.props;
        return (
            <div>

                {addBookPanelVisible && <AddAndEditPanel
                    hidePanel={() => dispatch(hidePanel())}
                    addBook={book => {
                        dispatch(addBook(book));
                    }}
                    editBook={(newBook) => dispatch(editBook(newBook))}
                    addOrEdit={addOrEdit}
                />}

                <Row gutter={16}>
                    <Col span={4} offset={2}>
                        <AddBook onClickAdd={() => dispatch(onClickAdd())}/>
                    </Col>
                    {books.map(function (book) {
                        return <Col span={4} key={book.id}><Book
                            book={book}
                            deleteBook={id => dispatch(deleteBook(id))}
                            onClickEdit={editBook => dispatch(onClickEdit(editBook))}
                            showOpernList={bookId => dispatch(showOpernList(bookId))}
                            addHeaderLink={bookAlias => dispatch(addHeaderLink(bookAlias))}
                        /></Col>
                    })}
                </Row>

            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(BookContainer);
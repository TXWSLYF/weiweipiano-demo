/**
 * Created by Alex on 2017/6/21.
 */
import{Card, Icon, Button} from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'


export default class Book extends React.Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
    }

    handleDelete() {
        let deleteBookId = {};
        deleteBookId.bookId = this.props.book.id;
        this.props.deleteBook(deleteBookId);
    }

    handleEdit() {
        const editBook = this.props.book;
        this.props.onClickEdit(editBook);
    }

    handleImageClick(e, bookId) {
        this.props.showOpernList(bookId);
    }

    render() {
        const {alias, cover, id} = this.props.book;
        return (
            <div>
                <Card bodyStyle={{paddingTop: 20, paddingLeft: 15, paddingRight: 15}}>
                    < div className="book-image">
                        <Link to={'/opernList?' + alias}
                              onClick={(e) => this.handleImageClick(e, id)}><img alt={alias}
                                                                                 src={cover}/></Link>
                    </div>
                    <h2>{alias}</h2>
                    <div className="book-edit-delete">
                        <Button type='primary' onClick={this.handleEdit}><Icon type="edit"
                                                                               style={{fontSize: '1.5em'}}/></Button>
                        <Button type="danger" onClick={this.handleDelete}><Icon type="delete"
                                                                                style={{fontSize: '1.5em'}}/></Button>
                    </div>
                </Card>
            </div>
        )
    }
}
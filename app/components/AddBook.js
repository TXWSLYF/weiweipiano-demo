/**
 * Created by Alex on 2017/6/21.
 */
import React from 'react'
import {Card, Icon} from 'antd'

export default class AddBook extends React.Component {
    constructor() {
        super();
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd() {
        this.props.onClickAdd();
    }

    render() {
        return (
            <div onClick={this.handleAdd}>
                <Card bodyStyle={{padding: 0}}>
                    <div className="book-add">
                        <Icon type="plus-circle-o" style={{fontSize: '4em'}}/>
                    </div>
                </Card>
            </div>
        )
    }
}

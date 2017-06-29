/**
 * Created by Alex on 2017/6/23.
 */
import React from 'react'
import OpernList from './OpernList'
import {Button} from 'antd'
import {clearOpernList, showOpernList} from '../../actions'
import {connect} from 'react-redux'

class OpernPanel extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const searchAlias = this.props.location.search.match(/\?(.+)/)[1];
        console.log(searchAlias);
        const {dispatch, books} = this.props;
        console.log(books);
        const searchId = books.find(function (book) {
            return book.alias === searchAlias
        }).id;
        dispatch(showOpernList(searchId));
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(clearOpernList());
    }

    render() {
        const {opernList} = this.props;
        return (
            <div>
                <div className="opern-panel-button-container">
                    <Button type="primary">新增曲谱</Button>
                    <Button type="primary">作业管理</Button>
                </div>
                <OpernList opernList={opernList}/>
            </div>
        )
    }
}

function select(state) {
    return state
}

export default connect(select)(OpernPanel)
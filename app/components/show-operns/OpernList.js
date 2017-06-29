/**
 * Created by Alex on 2017/6/23.
 */
import React from 'react'
import {Table, Popover} from 'antd'


export default class OpernList extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {opernList} = this.props;
        const columns = [{
            title: '序号',
            dataIndex: 'key',
            key: 'key',
            width: '50px',
            className: 'column-center',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '曲名',
            dataIndex: 'opernName',
            key: 'opernName',
            className: 'column-center',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '英文名',
            dataIndex: 'opernEnglishName',
            key: 'opernEnglishName',
            className: 'column-center',
            render: (text, record) => (<span><a href="#">{text}</a>
                <Popover content={<img src={record.illustrationPath} style={{width: 300, height: 300}}/>}>
                    <img src={record.thumbnail}
                         style={{float: 'right', width: 30, height: 30}}
                    /></Popover>
                </span>)
        }, {
            title: '页码',
            dataIndex: 'opernPageNumber',
            key: 'opernPageNumber',
            className: 'column-center'
        }, {
            title: '操作',
            dataIndex: 'action',
            width: '100px',
            className: 'column-center',
            render: () => (<span><a href="#">编辑</a><span className="ant-divider"/><a href="#">删除</a></span>)
        }, {
            title: '练习曲',
            dataIndex: 'practiceOpernList',
            key: 'practiceOpernList',
            className: 'column-center',
            render: () => '此曲暂未绑定练习曲'
        }];

        //曲谱为空
        return (
            <Table columns={columns} dataSource={opernList} bodyStyle={{width: '80%', margin: 'auto'}}
                   pagination={{className: 'column-pagination'}}
                   bordered/>
        )
    }
}


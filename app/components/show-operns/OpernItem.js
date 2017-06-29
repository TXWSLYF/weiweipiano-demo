/**
 * Created by Alex on 2017/6/23.
 */
import React from 'react'

export default class OpernItem extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.opernName}</td>
                <td>{this.props.opernEnglishName}</td>
                <td>{this.props.opernPageNumber}</td>
                <td><span>编辑</span>|<span>删除</span></td>
            </tr>
        )
    }
}
/**
 * Created by Alex on 2017/6/21.
 */

import React from 'react'
import {Link} from 'react-router-dom'

export default class Header extends React.Component {
    render() {
        //获取页面的href
        const url = window.location.href.match(/[\s\S]+?opernList\?([^\/]+)/);

        if (url) {
            const alias = decodeURI(url[1]);
            return (
                <header className="header">
                    <Link to="/">书籍管理></Link>
                    <Link to={"/opernList?" + alias}>{alias + '>'}</Link>
                </header>
            )
        }
        else {
            return (
                <div className="header">
                    <Link to="/build">书籍管理></Link>
                </div>
            )
        }
    }
}



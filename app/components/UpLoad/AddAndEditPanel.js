/**
 * Created by Alex on 2017/6/22.
 */
import React from 'react'
import {Modal, Input} from 'antd'
import Avatar from './Avatar'

export default class AddAndEditPanel extends React.Component {
    constructor(props) {
        super(props);

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.change = this.change.bind(this);
        this.getAvatar = this.getAvatar.bind(this);

        this.state = {
            coverChange: false,
            book: {
                name: '',
                alias: '',
                press: '',
                bar_code: '',
                cover: '',
                edition: '',
            }
        }
    }

    componentDidMount() {
        const {add, edit} = this.props.addOrEdit;
        if (add) {
            this.setState({
                coverChange: false,
                book: {}
            })
        }
        else if (edit) {
            console.log(this.props.addOrEdit.editBook);
            this.setState({
                coverChange: false,
                book: this.props.addOrEdit.editBook
            })
        }
    }

    change(e, type) {

        // 通过这种方法可以动态的选择想要修改的属性
        const editProps = {};
        editProps[type] = e.target.value;
        this.setState(function (prevState) {
            return {book: Object.assign({}, prevState.book, editProps)}
        })
    }

    handleOk(e) {
        const {addOrEdit} = this.props;
        const {book} = this.state;
        let data = new FormData();
        data.append('name', book.name.trim());
        data.append('press', book.press.trim());
        data.append('alias', book.alias.trim());
        data.append('barCode', book.bar_code.trim());
        data.append('edition', book.edition);
        const props = ['name', 'alias', 'edition', 'press', 'bar_code'];
        if (addOrEdit.add) {
            for (let i = 0; i < props.length; i++) {
                if (book[props[i]] === '') {
                    this.props.hidePanel();
                    break
                }
                else if (i === props.length - 1) {
                    data.append('image', book.cover);
                    this.props.addBook(data);
                }
            }
        }
        if (addOrEdit.edit) {
            for (let i = 0; i < props.length; i++) {
                if (book[props[i]] === '') {
                    this.props.hidePanel();
                    break
                }
                else if (i === props.length - 1) {

                    //修改书籍的时候需要首先判断cover是否改变，动态传递data
                    const {coverChange} = this.state;
                    if (coverChange) {
                        data.append('image', book.cover);
                    }
                    else {
                        data.append('ossPath', addOrEdit.editBook.cover)
                    }
                    data.append('bookId', addOrEdit.editBook.id);
                    this.props.editBook(data);
                }
            }
        }
    }

    handleCancel() {
        this.props.hidePanel();
    }

    //需要将获得的base64编码的图片包装为blob对象发送
    getAvatar(avatarSrc) {
        let data = avatarSrc;
        if (data.length < 1) {
            return false
        }
        let type = data.split(',')[0];    //获得data:image/png;base:64
        type = type.split(';')[0];       //获得data:image/png
        data = data.split(',')[1];      //获得图片的base64编码
        data = window.atob(data);       //数据解码

        let ia = new Uint8Array(data.length);        //Uint8Array 数组类型表示一个8位无符号整型数组
        for (let i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i)
        }
        let blob = new Blob([ia], {type: type});

        const newBook = Object.assign({}, this.state.book);
        newBook.cover = blob;
        this.setState({coverChange: true, book: newBook});
    }

    render() {
        const {name, alias, edition, press, bar_code} = this.state.book;
        const {addOrEdit} = this.props;
        const type = ['name', 'alias', 'edition', 'press', 'bar_code'];
        return (
            <Modal visible={true}
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}
                   style={{top: '300px'}}
            >
                <div>
                    <div style={{marginBottom: 16, width: 200}}>
                        <Input addonBefore={'书名：'} placeholder="输入书名" onChange={(e) => this.change(e, type[0])}
                               value={name}/>
                    </div>
                    <div style={{marginBottom: 16, width: 200}}>
                        <Input placeholder="输入别名" addonBefore={'别名：'} onChange={(e) => this.change(e, type[1])}
                               value={alias}/>
                    </div>
                    <div style={{marginBottom: 16, width: 200}}>
                        <Input addonBefore='第' addonAfter='版' placeholder="输入版本号"
                               onChange={(e) => this.change(e, type[2])}
                               value={edition}/>
                    </div>
                    <div style={{marginBottom: 16, width: 200}}>
                        <Input placeholder="输入出版社" addonBefore={'出版社：'} onChange={(e) => this.change(e, type[3])}
                               value={press}/>
                    </div>
                    <div style={{marginBottom: 16, width: 200}}>
                        <Input placeholder="输入条形码" onChange={(e) => this.change(e, type[4])} addonBefore={'条形码：'}
                               value={bar_code}/>
                    </div>
                </div>

                {/*根据是否处于添加和修改模式条件渲染<Avatar/>组件，以达到动态传递initCover参数的目的*/}
                {
                    addOrEdit.add &&
                    <Avatar getAvatar={avatarSrc => this.getAvatar(avatarSrc)}/>
                }
                {
                    addOrEdit.edit &&
                    <Avatar getAvatar={avatarSrc => this.getAvatar(avatarSrc)} initCover={addOrEdit.editBook.cover}/>
                }
            </Modal>
        )
    }
}
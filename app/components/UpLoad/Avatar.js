/**
 * Created by Alex on 2017/6/27.
 */
import React from 'react'
import {Upload, Icon, Modal} from 'antd'
import Crop from './Crop'

export default class Avatar extends React.Component {
    constructor() {
        super();
        this.handleCancel = this.handleCancel.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getCropData = this.getCropData.bind(this);
        this.handleCancelCrop = this.handleCancelCrop.bind(this);

        this.state = {
            cropModalVisible: false,
            cropSrc: '',
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }

    componentDidMount() {
        const {initCover} = this.props;
        if (initCover !== undefined) {
            this.setState({
                fileList: [{
                    uid: -1,
                    name: 'cover',
                    status: 'done',
                    url: initCover,
                }]
            })
        }
    }

    componentWillUnmount(){
        this.state = {
            cropModalVisible: false,
            cropSrc: '',
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }

    handleCancel() {
        this.setState({previewVisible: false})
    }

    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        })
    }

    //onChange事件有三个效果：1.更新fileList,2.显示crop组件,3.更新cropSrc属性
    handleChange({file, fileList, event}) {
        console.log({fileList});
        console.log('fileList');
        this.setState({fileList});
        if (event !== undefined) {
            this.setState({cropModalVisible: true, cropSrc: file.url || file.thumbUrl})
        }
    }

    //getCropData事件有三个效果：1.根据crop组件获取截图的URL更新fileList,2.隐藏crop组件,3.将cropDataURL上传到AddAndEditPanel组件
    getCropData(cropDataURL) {
        this.setState({
            cropSrc: '',
            cropModalVisible: false,
            fileList: [{
                uid: -1,
                name: 'cover',
                status: 'done',
                url: cropDataURL,
            }]
        });
        this.props.getAvatar(cropDataURL);
    }

    handleCancelCrop() {
        this.setState({cropModalVisible: false});
    }

    render() {
        const {previewVisible, previewImage, fileList, cropModalVisible, cropSrc} = this.state;
        const uploadButton = (
            <div style={{width: '100px', height: '100px', position: 'relative', top: '50px', left: '50px'}}>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div style={{position: 'absolute', height: '200px', width: '200px', top: '20px', right: '40px'}}>
                <Upload
                    action="/api/pc/test"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={cropModalVisible} footer={null} onCancel={() => this.handleCancelCrop()}>
                    <Crop src={cropSrc} getCropData={cropDataURL => this.getCropData(cropDataURL)}/>
                </Modal>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}

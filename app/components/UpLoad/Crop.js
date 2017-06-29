/**
 * Created by Alex on 2017/6/27.
 */
import React from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import {Button} from 'antd'

export default class Crop extends React.Component {
    constructor() {
        super();
        this.cropImage = this.cropImage.bind(this);
    }

    cropImage() {
        if (this.cropper.getCroppedCanvas() === 'null') {
            return false
        }
        this.props.getCropData(this.cropper.getCroppedCanvas().toDataURL())
    }

    render() {
        return (
            <div>
                <div style={{width: '100%'}}>
                    <Cropper
                        src={this.props.src}
                        ref={cropper => {
                            this.cropper = cropper;
                        }}
                        style={{height: 400, width: '100%'}}
                        aspectRatio={246/346}
                        guides={false}
                    />
                </div>
                <div>
                    <Button type="primary" size="large" onClick={this.cropImage} style={{marginTop: '10px'}}>
                        确认裁剪
                    </Button>
                </div>
            </div>
        );
    }
}


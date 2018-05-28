/**
 * Created by zxh on 2016/12/12.
 */
import React from 'react';
import {
  Form,
  Col,
  Input,
  Button,
  DatePicker,
  Select,
  Table,
  Icon,
  Radio,
  InputNumber,
  Checkbox,
  Modal,
  message,
  notification,
  Affix,
  Upload
} from 'antd';

const FormItem = Form.Item;

import Logger from 'ns_logger';


const logger = Logger.getLogger('ImageUpAndVIewConverter');

class ImageUpAndVIewConverter {

  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    switch (field.dataType) {
      case 'oneImageFileUpAndView':
        return this.transformImageFile(option);
    }
  }
  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    if (!isJPG && !isPNG ) {
      notification.error({
        message: '请上传正确的图片文件',
        description: '系统支持jpg、png，2种文件格式'});
    }
    return isJPG || isPNG;
  }
  /**
   * 将schema中的一列转换为下拉框
   *
   * @param field
   */
  transformImageFile(option) {
    const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
    const imageFileUpUrl = field.imageFileUpUrl;
    const OPTION_IMAGE =0x1;
    const OPTION_SAVE =0x1<<1;
    const OPTION_MD5 =0x1<<2;
    const upOpt = obj.state.upOpt
    const len = upOpt ? upOpt.length : 0;
    let queryUrl = 0;
    for(let i=0; i < len; i++){
      switch (upOpt[i]) {
        case 'OPTION_SAVE':
          queryUrl = OPTION_SAVE | queryUrl;
          break;
        case 'OPTION_MD5':
          queryUrl = OPTION_MD5 | queryUrl;
          break;
      }
    }
    const url = `${imageFileUpUrl}?requestFlag=${queryUrl}&responseFlag=${obj.responseStatus}`
    const bpButton = (<div>
      <Icon type="plus" />
      <div className="ant-upload-text">点击上传</div>
    </div>)
    // console.log('obj',obj)
    return wrapper((
      {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<div>
        <Upload
                action={url}
                beforeUpload={this.beforeUpload}
                listType="picture-card"
                fileList={obj.state.fileList}
                onChange={obj.onImageFileChange}
                onRemove={obj.onRemove}
                onPreview={obj.handlePreview}>
          {obj.state.fileList.length >= 1 ? "" : bpButton}
        </Upload>
        <Modal visible={obj.state.previewVisible} footer={null} onCancel={obj.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={obj.state.previewImage} />
        </Modal>
      </div>)}

    ), field);
  }

}

export default ImageUpAndVIewConverter;

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


const logger = Logger.getLogger('FileUpConverter');

class FileUpConverter {

  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    switch (field.dataType) {
      case 'fileUp':
        return this.transformFileUp(option);
    }
  }


  /**
    * 将schema中的一列转换为下拉框
    *
    * @param field
    */
  transformFileUp(option) {
    const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
    const { props } = field;
    const imageFileUpUrl = field.fileUpUrl;
    const OPTION_IMAGE =0x1;
    const OPTION_SAVE =0x1<<1;
    const OPTION_MD5 =0x1<<2;
    const upOpt = obj.state.upOpt
    const len = upOpt.length;
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
    return wrapper( //给文件上传功能包装成表单
      ({
      ...obj.props.form.getFieldDecorator(field.key, fieldOptions)
          (
          <Upload action={url} onChange={obj.onFileUpChange}  fileList={obj.state.fileObjs} houZhui={obj.houZhui} {...props}>
            <Button type="ghost"
            >
              <Icon type="upload" /> 上传文件
            </Button>
          </Upload>
          )
      }), field);
  }

}

export default FileUpConverter;

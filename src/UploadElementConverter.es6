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


const logger = Logger.getLogger('UploadElementConverter');

class UploadElementConverter {

  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    switch (field.dataType) {
      case 'upload':
        return this.transformUpload(option);
    }
  }

  /**
    * 将schema中的一列转换为下拉框
    *
    * @param field
    */
  transformUpload(option) {
    const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
    return wrapper((
      {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<Upload fileList={obj.state.fileList} action={field.actionAdr} listType="picture" onChange={obj.handleUpChange}>
        <Button type="ghost">
          <Icon type="upload" /> 点击上传
              </Button>
      </Upload>)}
    ), field);
  }

}

export default UploadElementConverter;

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


const logger = Logger.getLogger('ResponseDataConverter');

class ResponseDataConverter {

  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    switch (field.dataType) {
      case 'responseData':
        return this.transformResponseData(option);
    }
  }

  /**
    * 将schema中的一列转换为下拉框
    *
    * @param field
    */
  transformResponseData(option) {
    const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
    return wrapper((
          {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<Input placeholder={field.placeholder} size="default" disabled="true" />)}
    ), field);
  }

}

export default ResponseDataConverter;

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

import FormFieldConverter from './FormFieldConverter';
import QueryFormFieldConverter from './QueryFormFieldConverter';

class FieldConverterFactory {


  static FormFieldConverter = 1;
  static QueryFormFieldConverter = 2;

  static converterObj = {};

  static getConverter(type) {

    var converter = null;


    if (this.converterObj[type] == null) {
      if (type == this.FormFieldConverter) {
        converter = new FormFieldConverter();
      }
      else if (type == this.QueryFormFieldConverter) {
        converter = new QueryFormFieldConverter();
      }
      this.converterObj[type] = converter;
    } else {
      converter = this.converterObj[type];
    }


    return converter;
  }
}

export default FieldConverterFactory;

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
import FieldConverter from './FieldConverter';
import QueryElementConverter from './QueryElementConverter';
import BaseElementConverter from './BaseElementConverter';
import ImageViewConverter from './ImageViewConverter';
class QueryFormFieldConverter extends FieldConverter {

  constructor() {
    super();
    this.addConverter(new ImageViewConverter());
    this.addConverter(new QueryElementConverter());
    this.addConverter(new BaseElementConverter());
  }

  /**
   * 辅助函数
   *
   * @param formItem
   * @param field
   * @returns {XML}
   */
  colWrapper(formItem, field) {
    const { labelColSize = 6, wrapperColSize = 18, formItemProps = {}, extra = '' } = field;
    return (
      <Col key={field.key} sm={8}>
        <FormItem extra={extra} key={field.key} label={field.title}
          labelCol={{ span: labelColSize }} wrapperCol={{ span: wrapperColSize }}
          {...formItemProps}
        >
          {formItem}
        </FormItem>
      </Col>
    );
  }
}

export default QueryFormFieldConverter;

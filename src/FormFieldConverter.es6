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
import BaseElementConverter from './BaseElementConverter';
import UploadElementConverter from './UploadElementConverter';
import QueryElementConverter from './QueryElementConverter';
import ImageFileConverter from './ImageFileConverter';
import FileUpConverter from './FileUpConverter';
import SelectTagConverter from './SelectTagConverter';
import SelectByDefaultValueConverter from './SelectByDefaultValueConverter';
import ResponseDataConverter from './ResponseDataConverter';
import CheckboxConverter from './CheckboxConverter';
import RadioConverter from './RadioConverter';
import SelectByRequestValueConverter from './SelectByRequestValueConverter';
import ImageUpAndVIewConverter from './ImageUpAndVIewConverter';
import OneImageUpAndVIewConverter from './OneImageUpAndVIewConverter';
import SelectMultipleConverter from './SelectMultipleConverter';

const logger = Logger.getLogger('FormFieldConverter');

class FormFieldConverter extends FieldConverter {

  constructor() {
    super();
    this.addConverter(new BaseElementConverter());  //select || textarea
    this.addConverter(new UploadElementConverter());  //upload
    this.addConverter(new QueryElementConverter());  //FIXME: showType? 2017年9月18日11:45:52 Rival
    this.addConverter(new ImageFileConverter());  //imageFile
    this.addConverter(new FileUpConverter());  //fileUp
    this.addConverter(new SelectTagConverter());  //selectTag
    this.addConverter(new SelectByDefaultValueConverter());  //selectByDefaultValue
    this.addConverter(new ResponseDataConverter());  //responseData
    this.addConverter(new CheckboxConverter());  //checkbox
    this.addConverter(new RadioConverter());  //radio
    this.addConverter(new SelectByRequestValueConverter());  //selectByRequestValue
    this.addConverter(new ImageUpAndVIewConverter());  //imageFileUpAndView
    this.addConverter(new OneImageUpAndVIewConverter());  //OneImageUpAndVIewConverter
    this.addConverter(new SelectMultipleConverter());  //SelectMultipleConverter
  }

  /**
   * 辅助函数
   *
   * @param formItem
   * @param field
   * @returns {XML}
   */

  /**
   * 修订原因：form表单要动态加载(已确认 隐藏|显示交替)
   * 修订时间：2017年10月18日16:49:27
   * 修订人：Rival
   */
  colWrapper(formItem, field) {
    const hdisabled = formItem.props.hdisabled;
    return (
      <FormItem key={field.key}
                className={field.formItemClassName}
                label={field.title}
                labelCol={field.labelCol != undefined ? field.labelCol : {span: 6}}
                wrapperCol={field.wrapperCol != undefined  ? field.wrapperCol : {span : 18}}
                style={{
                  display: hdisabled ? 'none' : 'block'
                }}>
        {formItem}
        {field.extraDom ? field.extraDom : null}
      </FormItem>
    );
  }
}

export default FormFieldConverter;

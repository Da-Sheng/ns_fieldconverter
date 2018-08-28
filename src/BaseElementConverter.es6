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
  Upload,
  TimePicker
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const TextArea = Input.TextArea;

import Logger from 'ns_logger';


const logger = Logger.getLogger('BaseElementConverter');

class BaseElementConverter {
  convert(option) {

    const {getFieldProps, field, fieldOptions, wrapper, obj,getFieldDecorator} = option;
    const { props = {} } = field;
    switch (field.dataType) {
      case 'textarea':
        logger.debug('transform field %o to varcharOne input', field);
        return wrapper((
          {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<TextArea disabled={field.disabled} placeholder={field.placeholder} autosize {...props} />)}
        ), field);
      case 'select':
        return this.transformSelect(option);
    }
    return this.transformNormal(option);
  }
  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  }


  /**
   * 将schema中的一列转换为普通输入框
   *
   * @param field
   * @returns {XML}
   */
  transformNormal(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    const { props } = field;
    switch (field.dataType) {
      case 'int':
        logger.debug('transform field %o to integer input', field);
        return wrapper((
          {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<InputNumber size="default"
          disabled={field.disabled}
                                                                                    hdisabled={
                                                                                      obj.props.formItemsConfig
                                                                                      && obj.props.formItemsConfig[field.key]
                                                                                      && obj.props.formItemsConfig[field.key].disabled
                                                                                    } {...props}
                                                                                    />)}
        ), field);
      case 'float':
        logger.debug('transform field %o to float input', field);
        return wrapper((
          {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<InputNumber step={0.01} size="default"  placeholder={field.placeholder}  {...getFieldProps(field.key, fieldOptions) }
          {...props}
          />)}
        ), field);
      case 'datetime':
        logger.debug('transform field %o to datetime input', field);
        return wrapper((
          {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
            placeholder={field.placeholder || '请选择日期'} {...props} />)}
        ), field);
      case 'untilNowTime': //业务需求，日期格式为截至今天，且格式形如2017-05-21
        logger.debug('transform field %o to datetime input', field);
        return wrapper((
          {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<DatePicker showTime format="YYYY-MM-DD"  disabledDate={this.disabledDate}  size="default"
            placeholder={field.placeholder || '请选择日期'} {...props} />)}
        ), field);
      case 'time':
        logger.debug('transform field %o to datetime input', field);
        return wrapper((
          {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<TimePicker  showTime format="HH:mm:ss"
                                                                                    placeholder={field.placeholder || '请选择时间'}
                                                                                    disabled={field.disabled}
                                                                                    hdisabled={
                                                                                      obj.props.formItemsConfig
                                                                                      && obj.props.formItemsConfig[field.key]
                                                                                      && obj.props.formItemsConfig[field.key].disabled
                                                                                    } {...props}
                                                                                    />)}
        ), field);
      case 'varchar':  // 默认就是普通的输入框
        logger.debug('transform field %o to varchar input', field);
        return wrapper((
           {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<Input onClick={field.getModalInnerTable}
                                                                               placeholder={field.placeholder}
                                                                               disabled={field.disabled}
                                                                               hdisabled={
                                                                                 obj.props.formItemsConfig
                                                                                 && obj.props.formItemsConfig[field.key]
                                                                                 && obj.props.formItemsConfig[field.key].disabled
                                                                               }
                                                                               size="default"
                                                                               onPressEnter={ function () {
                                                                                   obj.handleSubmit && obj.handleSubmit(event);
                                                                               } } {...props} />)}
        ), field);
      case 'hidden':  // 隐藏表单域
        logger.debug('transform field %o to hidden input', field);
        return wrapper((
          {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<Input type="hidden" placeholder={field.placeholder} disabled={field.disabled} size="default" {...props} />)}
        ), field);
      case 'varTable':
        logger.debug('transform field %o to hidden input', field);
        return wrapper((
          {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<Col {...props}>{field.name}{field.data !== "" ? field.data :<a href='javascript:;'>点击下载</a>}</Col>)}
        ), field);
    }
  }

  /**
   * 将schema中的一列转换为下拉框
   *
   * @param field
   */
  transformSelect(option) {
    const {getFieldProps, field, fieldOptions, wrapper,obj} = option;
    const { props } = field;
    logger.debug('transform field %o to varcharSelect', field);

    let selectOptions = [];

    if (field.options) {
      field.options.forEach((option) => {
        selectOptions.push(<Option value={option.value} key={option.value}>{option.name}</Option>);
      });
    }

    return wrapper((
      {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<Select onSelect={field.selectChange} disabled={field.disabled} style={{ width: 200 }} placeholder="请选择" {...props}>
        {selectOptions}
      </Select>)}
    ), field);
  }

}

export default BaseElementConverter;

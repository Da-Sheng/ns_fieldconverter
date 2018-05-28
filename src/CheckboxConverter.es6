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
} from 'antd';

const FormItem = Form.Item;

import Logger from 'ns_logger'

const logger = Logger.getLogger('CheckboxConverter');
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class CheckboxConverter {

  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    switch (field.dataType) {
      case 'checkbox':
        return this.transformCheckboxConverter(option);
    }
  }

  /**
    * 将schema中的一列转换为下拉框
    *
    * @param field
    */
  transformCheckboxConverter(option) {
    const {getFieldProps, field, fieldOptions, obj, wrapper} = option;

    let defalutCheckOptions = [];
    field.defalutCheck.forEach((option) => {
      defalutCheckOptions.push({'label' : option.label, 'value' : option.value});
    });


    return wrapper((
      {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<CheckboxGroup options={defalutCheckOptions} onChange={obj.onCheckBoxChange}  />)}
    ), field);
  }

}

export default CheckboxConverter;

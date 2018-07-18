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


const logger = Logger.getLogger('SelectByDefaultValueConverter');
const Option = Select.Option;

class SelectByDefaultValueConverter {

  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    switch (field.dataType) {
      case 'selectByDefaultValue':
        return this.transformSelectByDefault(option);
    }
  }

  /**
    * 将schema中的一列转换为下拉框
    *
    * @param field
    */
  transformSelectByDefault(option) {
    const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
    const { props } = field;
    let selectOptionss = [];
    field.defaultSelect.forEach((option) => {
      selectOptionss.push(<Option key={option.value} value={option.value}>{option.name}</Option>);
    });

    return wrapper((
      {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<Select
        size="large"
        style={{ width: 200 }}
        onChange={obj.onSelectByDefaultValueChange}
        placeholder="请选择"
        onSelect={!!field.onSelect ? field.onSelect : () => {}}
        {...props}
        >
        {selectOptionss}
      </Select>)}
    ), field);
  }

}

export default SelectByDefaultValueConverter;

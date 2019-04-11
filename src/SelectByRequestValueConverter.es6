/**
 * Gonzo
 *  2017年03月28日11:39:04
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


const logger = Logger.getLogger('SelectByRequestValueConverter');
const Option = Select.Option;

class SelectByRequestValueConverter {

  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;

    switch (field.dataType) {
      case 'selectByRequestValue':
        return this.transformSelectRequestValue(option);
    }
  }

  /**
   * 将schema中的一列转换为下拉框
   *
   * @param field
   */
  transformSelectRequestValue(option) {
    const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
    const { props = {} } = field;
    let selectOptionss = [];
    if(field.requestSelectValue){
      field.requestSelectValue.forEach((option) => {
        selectOptionss.push(<Option key={option.key} value={option.value}>{option.name}</Option>);
      });
    }

    const select = (obj.state.defaultSelectValue ? <Select
                    size="large"
                    style={{ width: 200 }}
                    placeholder={field.placeholder}
                    initialValue={field.value}
                    {...getFieldProps(field.key, fieldOptions) }
                    {...props}
                  >
                    {selectOptionss}
                  </Select> : <Select
                    size="large"
                    style={{ width: 200 }}
                    placeholder={field.placeholder}
                    {...getFieldProps(field.key, fieldOptions) }
                    {...props}
                  >
                    {selectOptionss}
                  </Select>)

    return wrapper(select , field);
  }
}

export default SelectByRequestValueConverter;

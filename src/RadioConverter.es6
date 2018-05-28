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

import Logger from 'ns_logger';


const logger = Logger.getLogger('RadioConverter');
const RadioGroup = Radio.Group;

class RadioConverter {


  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    switch (field.dataType) {
      case 'radio':
        return this.transformRadioConverter(option);
    }
  }

  /**
    * 将schema中的一列转换为下拉框
    *
    * @param field
    */
  transformRadioConverter(option) {
    const {getFieldProps, field, fieldOptions, obj, wrapper} = option;

    let defalutRadio = [];

    field.radioOption.forEach((option) => {
      defalutRadio.push( <Radio key={option.value} value={option.value} disabled={obj.isDisabledRadio} >{option.label}</Radio>);
    });

    return wrapper(({...obj.props.form.getFieldDecorator(field.key,fieldOptions)
            (<RadioGroup initialValue={field.value} onChange={field.onChange && field.onChange.bind(field)}>
              {defalutRadio}
            </RadioGroup>)})
    , field);
    // return wrapper((
    //         <RadioGroup {...getFieldProps(field.key, fieldOptions) } value={obj.state.radioValue}>
    //         {defalutRadio}
    //         </RadioGroup>
    // ), field);
  }

}

export default RadioConverter;

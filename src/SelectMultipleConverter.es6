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
const Option = Select.Option;
import Logger from 'ns_logger';
const logger = Logger.getLogger('SelectTagConverter');

var inputType ;  //限制输入个数配置
var dropdownStyle ; //是否显示下拉菜单

class SelectTagConverter {

  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    switch (field.dataType) {
      case 'selectMultiple':
        return this.transformSelectTag(option);
    }
  }
  onSelectTagChange = (value) => {  //监听输入框value变化

    //inputType形如：{ typeName: 'MaxLength',nums:'200', wrongTips: '选择对象最多200个,超过则无效！',time:'3' }

    if(inputType){   //需要在formSchema里面设置inputType做自定义设置，详细见推送对象的formSchema
      if(inputType.typeName == "MaxLength" && value.length > inputType.nums){  
        message.error(inputType.wrongTips,inputType.time);
        value.splice(inputType.nums);
      }
    }
  }
  /**
    * 将schema中的一列转换为下拉框
    *
    * @param field
    */
  transformSelectTag(option) {
    const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
    const { props } = field;
    let selectOptionss = [];
    field.defaultSelect.forEach((option) => {
      selectOptionss.push(<Option key={option.value} value={option.value}>{option.name}</Option>);
    });
    inputType = field.inputType;         //限制输入个数

    return wrapper((
         {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<Select
                  mode="multiple"
                  style = {{ width: '100%' }}
                  onChange = {this.onSelectTagChange.bind(this)}
                  placeholder = {field.placeholder}
                  tokenSeparators = {[',','，']} //切割规则是中文逗号也可以是英文逗号
                  initialValue = {field.defaultValue}
                  {...props}
          >
            {selectOptionss}
          </Select>)}
    ), field);
  }

}

export default SelectTagConverter;

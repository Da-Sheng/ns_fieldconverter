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

const TextArea = Input.TextArea;

class FieldConverter {

  constructor() {
    this.converters = [];
  }

  addConverter(converter) {
    this.converters.push(converter);
  }

  //调用.convert()真正返回的东西
  extendConvert(option) {
    var fieldForm = null;

    for(var i=0;i<this.converters.length;i++)
    {
      fieldForm = this.converters[i].convert(option);
      if (fieldForm != null) {
        break;
      }
    }
    return fieldForm;
  }

  convert(obj, field) {//InnerTale(this), formSchema [key]
    if (typeof field._render === 'function') {
      return field._render(obj, obj.props.DBTableInstance)
    }
    var colWrapper = this.colWrapper;
    return this.internalConvert({ obj: obj, field: field, wrapper: colWrapper });
  }

  /**
   * 将schema中的一个字段转换为表单的一项
   *
   * @param field
   */
  internalConvert(option) {//{obj: InnerTable(this), field: formSchema[key], wrapper: colWrapper}
    this.wrapperOption(option);//添加常用属性引用别名
    // options = {
    //  obj: InnerTable(this)
    //  field: formSchema[key]
    //  wrapper: colWrapper
    //  getFieldProps: InnerTable(this).getFieldProps  见../../DBTable/index ：401
    //  fieldOptions: {
    //    rules: field.rules,
    //    initialValue: field.initialValue,
    //    valuePropName: field.valuePropName
    //  }
    // }
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    const { props } = field;

    if (field.isHidethis) {
      return;
    }

    //obj.formData[field.key]
    // 对于主键, 直接返回一个不可编辑的textarea
    if (this.primaryKey === field.key) { //FIXME：this? 2017年9月18日11:39:18 Rival
      return wrapper((
        {...obj.props.form.getFieldDecorator(field.key)(<TextArea autosize={{ minRows: 1, maxRows: 10 }} disabled
          size="default" {...props} />)}
      ), field);
    }

    var fieldItem = this.extendConvert(option);

    if (fieldItem != null)// FIXME: 有何意义? 2017年9月18日11:40:24 Rival
      return fieldItem;
  }

  wrapperOption(option) {
    option.getFieldProps = option.obj.props.form.getFieldProps;
    var fieldOptions = {};

    /**
     * 修订原因：form表单要动态显示
     * 修订时间：2017年10月18日11:20:25
     * 修订人：Rival
     */
    if (option.field.rules) {
      if (option.obj.props.formItemsConfig && option.obj.props.formItemsConfig[option.field.key] && option.obj.props.formItemsConfig[option.field.key].disabled) {
        return fieldOptions.rules = [];
      }
      fieldOptions.rules = option.field.rules;
    }

    if (option.field.initialValue) {
      fieldOptions.initialValue = option.field.initialValue;
    }

    if (option.field.valuePropName) {
      fieldOptions.valuePropName = option.field.valuePropName;
    }
    option.fieldOptions = fieldOptions;
  }

  colWrapper(formItem, field)
  {
    return null;
  }
}

export default FieldConverter;

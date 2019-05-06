/**
 * Created by zxh on 2016/12/12.
 */
import React from 'react';
import moment from 'moment';
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
const { RangePicker } = DatePicker;
import Logger from 'ns_logger';
const Option = Select.Option;
const RadioGroup = Radio.Group;

const logger = Logger.getLogger('QueryElementFieldConverter');

class QueryElementFieldConverter {


 /**
   * 将schema中的一列转换为下拉框
   *
   * @param field
   */
  transformSelect(option) {
    // TODO: 这里是否要做schema校验
    const options = [];
    const {getFieldProps, field, fieldOptions, wrapper,obj} = option;
    const { props } = field;
    let id = 0;
    logger.debug('transform field %o to Select component', field);
    if (typeof field.options === 'function') {
      field.options = field.options();
    }
    field.options.forEach((option) => {
      id++;
      options.push(<Option key={id} value={option.value}>{option.name}</Option>);
    });

    return wrapper((
      {...obj.props.form.getFieldDecorator(field.key, fieldOptions)(<Select placeholder={field.placeholder || '请选择'}
                                                                            size="default"
                                                                            mode={field.mode}
                                                                            showSearch={field.showSearch}
                                                                            filterOption={field.filterOption || true}
                                                                            optionLabelProp={field.optionLabelProp || 'children'}
                                                                            {...props}>
        {options}
      </Select>)}
    ), field);
  }

  /**
   * 将schema中的一列转换为单选框
   *
   * @param field
   */
  transformRadio(option) {
    const options = [];
    const {getFieldProps, field, fieldOptions, wrapper} = option;
    const { props = {} } = field;

    logger.debug('transform field %o to Radio component', field);
    field.options.forEach((option) => {
      options.push(<Radio key={option.key} value={option.key} {...props}>{option.value}</Radio>);
    });

    return wrapper((
      <RadioGroup {...getFieldProps(field.key, {initialValue: field.initialValue}) }
                  defaultValue={field.initialValue} {...props}>
        {options}
      </RadioGroup>
    ), field);
  }

    /**
   * 将schema中的一列转换为checkbox
   *
   * @param field
   */
  transformCheckbox(option) {
    const options = [];
    const {getFieldProps, field, fieldOptions, wrapper} = option;

    logger.debug('transform field %o to Checkbox component', field);
    field.options.forEach((option) => {
      options.push({ label: option.value, value: option.key });
    });

    return wrapper((
      <CheckboxGroup options={options} {...getFieldProps(field.key) } />
    ), field);
  }

  /**
   * 转换为下拉多选框
   *
   * @param field
   * @returns {XML}
   */
  transformMultiSelect(option) {
    const options = [];
    const {getFieldProps, field, fieldOptions, wrapper} = option;

    logger.debug('transform field %o to MultipleSelect component', field);
    field.options.forEach((option) => {
      options.push(<Option key={option.key} value={option.key}>{option.value}</Option>);
    });

    return wrapper((
      <Select mode='multiple' placeholder={field.placeholder || '请选择'} size="default" {...getFieldProps(field.key) }>
        {options}
      </Select>
    ), field);
  }

    /**
   * 也是个辅助函数, 由于是范围查询, 输入的formItem是两个, 一个用于begin一个用于end
   *
   * @param beginFormItem
   * @param endFormItem
   * @param field
   * @returns {XML}
   */
  betweenColWrapper = (beginFormItem, endFormItem, field) => {
    const { FormItemProps = {} } = field;
    // 布局真是个麻烦事
    // col内部又用了一个row做布局
    // const {getFieldProps} = this.props.form;
    return (
      <Col key={`${field.key}Begin`} sm={8}>
        <Row>
          <Col span={16}>
            <FormItem extra={field.extra} key={`${field.key}Begin`} label={field.title} labelCol={{ span: 15 }} wrapperCol={{ span: 9 }} {...FormItemProps}>
              {beginFormItem}
            </FormItem>
          </Col>
          <Col span={7} offset={1}>
            <FormItem extra={field.extra} key={`${field.key}End`} labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} {...FormItemProps}>
              {endFormItem}
            </FormItem>
          </Col>
        </Row>
      </Col>
    );
  }

  /**
   * between类型比较特殊, 普通元素每个宽度是8, int和float的between元素宽度也是8, 但datetime类型的between元素宽度是16
   * 否则排版出来不能对齐, 太丑了, 逼死强迫症
   * 而且普通的transform函数返回是一个object, 而这个函数返回是一个array, 就是因为datetime的between要占用两列
   *
   * @param field
   */
  transformBetween(option) {
    const cols = [];
    let beginFormItem;
    let endFormItem;
    const {getFieldProps, field, fieldOptions, wrapper} = option;
    const { props = {}, FormItemProps = {} } = field;

    switch (field.dataType) {
      case 'int':
        logger.debug('transform field %o to integer BETWEEN component', field);
        beginFormItem = (<InputNumber size="default"
          placeholder={field.placeholderBegin || '最小值'} {...getFieldProps(`${field.key}Begin`) } {...props} />);
        endFormItem = (<InputNumber size="default"
          placeholder={field.placeholderEnd || '最大值'} {...getFieldProps(`${field.key}End`) } {...props} />);
        cols.push(this.betweenColWrapper(beginFormItem, endFormItem, field));
        break;
      case 'float':
        logger.debug('transform field %o to float BETWEEN component', field);
        beginFormItem = (<InputNumber step={0.01} size="default"
          placeholder={field.placeholderBegin || '最小值'} {...getFieldProps(`${field.key}Begin`) } {...props} />);
        endFormItem = (<InputNumber step={0.01} size="default"
          placeholder={field.placeholderEnd || '最大值'} {...getFieldProps(`${field.key}End`) } {...props} />);
        cols.push(this.betweenColWrapper(beginFormItem, endFormItem, field));
        break;
      // datetime类型的between要占用两个Col
      // 不写辅助函数了, 直接这里写jsx吧...
      case 'datetime':
        logger.debug('transform field %o to datetime BETWEEN component', field);
        cols.push(
          <Col key={`${field.key}Begin`} span={8}>
            <FormItem extra={field.extra} key={`${field.key}Begin`} label={field.title} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} {...FormItemProps}>
              <DatePicker  format="YYYY-MM-DD"
                placeholder={field.placeholderBegin || '开始日期'} {...getFieldProps(`${field.key}Begin`) } {...props} />
            </FormItem>
          </Col>
        );
        cols.push(<Col key={`${field.key}End`} span={8}>
          <FormItem extra={field.extra} key={`${field.key}End`} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} {...FormItemProps}>
            <DatePicker format="YYYY-MM-DD"
              placeholder={field.placeholderEnd || '结束日期'} {...getFieldProps(`${field.key}End`) } {...props} />
          </FormItem>
        </Col>);
        break;
      case 'datetimes':
        logger.debug('transform field %o to datetime BETWEEN component', field);
        cols.push(
          <Col key={`${field.key}`} span={16}>
            <FormItem extra={field.extra} key={`${field.key}`} label={field.title} labelCol={{ span: 3 }} wrapperCol={{ span: 18 }} {...FormItemProps}>
              <RangePicker format="YYYY-MM-DD HH:mm:ss" showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}}
                placeholder={['开始日期', '结束日期']} {...getFieldProps(`${field.key}`) } {...props} />
            </FormItem>
          </Col>
        );
        break;
      default:
        // 理论上来说不会出现这种情况
        logger.error('unknown dataType: %s', field.dataType);
    }
    return cols;
  }

  convert(option) {
    const options = [];


    var items=null;

    const {getFieldProps, field, fieldOptions, wrapper} = option;

    switch (field.showType) {
      case 'select':
        items=this.transformSelect(option);
        break;
      case 'radio':
        items=this.transformRadio(option);
        break;
      case 'checkbox':
        items=this.transformCheckbox(option);
        break;
      case 'multiSelect':
        items=this.transformMultiSelect(option);
        break;
      case 'between':
        items=[];
        for (const col of this.transformBetween(option)) {  // between类型比较特殊, 返回的是一个数组
          items.push(col)
        }
        break;
      case 'betweens':
        items=this.transformBetween(option)[0];
        break;
    }
    return items;
  }


}

export default QueryElementFieldConverter;

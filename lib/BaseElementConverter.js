'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by zxh on 2016/12/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _ns_logger = require('ns_logger');

var _ns_logger2 = _interopRequireDefault(_ns_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormItem = _antd.Form.Item;
var Option = _antd.Select.Option;

var TextArea = _antd.Input.TextArea;

var logger = _ns_logger2.default.getLogger('BaseElementConverter');

var BaseElementConverter = function () {
  function BaseElementConverter() {
    _classCallCheck(this, BaseElementConverter);

    this.disabledDate = function (current) {
      // Can not select days before today and today
      return current && current.valueOf() > Date.now();
    };
  }

  _createClass(BaseElementConverter, [{
    key: 'convert',
    value: function convert(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj,
          getFieldDecorator = option.getFieldDecorator;

      switch (field.dataType) {
        case 'textarea':
          logger.debug('transform field %o to varcharOne input', field);
          return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(TextArea, { disabled: field.disabled, placeholder: field.placeholder, autosize: true }))), field);
        case 'select':
          return this.transformSelect(option);
      }
      return this.transformNormal(option);
    }
  }, {
    key: 'transformNormal',


    /**
     * 将schema中的一列转换为普通输入框
     *
     * @param field
     * @returns {XML}
     */
    value: function transformNormal(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;

      switch (field.dataType) {
        case 'int':
          logger.debug('transform field %o to integer input', field);
          return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(_antd.InputNumber, { size: 'default',
            disabled: obj.props.formItemsConfig && obj.props.formItemsConfig[field.key] && obj.props.formItemsConfig[field.key].disabled }))), field);
        case 'float':
          logger.debug('transform field %o to float input', field);
          return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(_antd.InputNumber, _extends({ step: 0.01, size: 'default', placeholder: field.placeholder }, getFieldProps(field.key, fieldOptions))))), field);
        case 'datetime':
          logger.debug('transform field %o to datetime input', field);
          return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(_antd.DatePicker, { showTime: true, format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: field.placeholder || '请选择日期' }))), field);
        case 'untilNowTime':
          //业务需求，日期格式为截至今天，且格式形如2017-05-21
          logger.debug('transform field %o to datetime input', field);
          return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(_antd.DatePicker, { showTime: true, format: 'YYYY-MM-DD', disabledDate: this.disabledDate, size: 'default',
            placeholder: field.placeholder || '请选择日期' }))), field);
        case 'time':
          logger.debug('transform field %o to datetime input', field);
          return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(_antd.TimePicker, { showTime: true, format: 'HH:mm:ss',
            placeholder: field.placeholder || '请选择时间',
            disabled: obj.props.formItemsConfig && obj.props.formItemsConfig[field.key] && obj.props.formItemsConfig[field.key].disabled }))), field);
        case 'varchar':
          // 默认就是普通的输入框
          logger.debug('transform field %o to varchar input', field);
          return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(_antd.Input, { onClick: field.getModalInnerTable,
            placeholder: field.placeholder,
            disabled: obj.props.formItemsConfig && obj.props.formItemsConfig[field.key] && obj.props.formItemsConfig[field.key].disabled,
            size: 'default',
            onPressEnter: function onPressEnter() {
              obj.handleSubmit && obj.handleSubmit(event);
            } }))), field);
        case 'hidden':
          // 隐藏表单域
          logger.debug('transform field %o to hidden input', field);
          return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(_antd.Input, { type: 'hidden', placeholder: field.placeholder, disabled: field.disabled, size: 'default' }))), field);
        case 'varTable':
          logger.debug('transform field %o to hidden input', field);
          return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(
            _antd.Col,
            null,
            field.name,
            field.data !== "" ? field.data : _react2.default.createElement(
              'a',
              { href: 'javascript:;' },
              '\u70B9\u51FB\u4E0B\u8F7D'
            )
          ))), field);
      }
    }

    /**
     * 将schema中的一列转换为下拉框
     *
     * @param field
     */

  }, {
    key: 'transformSelect',
    value: function transformSelect(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;

      logger.debug('transform field %o to varcharSelect', field);

      var selectOptions = [];

      if (field.options) {
        field.options.forEach(function (option) {
          selectOptions.push(_react2.default.createElement(
            Option,
            { value: option.value, key: option.value },
            option.name
          ));
        });
      }

      return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(
        _antd.Select,
        { onSelect: field.selectChange, disabled: field.disabled, style: { width: 200 }, placeholder: '\u8BF7\u9009\u62E9' },
        selectOptions
      ))), field);
    }
  }]);

  return BaseElementConverter;
}();

exports.default = BaseElementConverter;
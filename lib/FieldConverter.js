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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormItem = _antd.Form.Item;

var TextArea = _antd.Input.TextArea;

var FieldConverter = function () {
  function FieldConverter() {
    _classCallCheck(this, FieldConverter);

    this.converters = [];
  }

  _createClass(FieldConverter, [{
    key: 'addConverter',
    value: function addConverter(converter) {
      this.converters.push(converter);
    }

    //调用.convert()真正返回的东西

  }, {
    key: 'extendConvert',
    value: function extendConvert(option) {
      var fieldForm = null;

      for (var i = 0; i < this.converters.length; i++) {
        fieldForm = this.converters[i].convert(option);
        if (fieldForm != null) {
          break;
        }
      }
      return fieldForm;
    }
  }, {
    key: 'convert',
    value: function convert(obj, field) {
      //InnerTale(this), formSchema [key]
      if (typeof field._render === 'function') {
        return field._render(obj, obj.props.DBTableInstance);
      }
      var colWrapper = this.colWrapper;
      return this.internalConvert({ obj: obj, field: field, wrapper: colWrapper });
    }

    /**
     * 将schema中的一个字段转换为表单的一项
     *
     * @param field
     */

  }, {
    key: 'internalConvert',
    value: function internalConvert(option) {
      //{obj: InnerTable(this), field: formSchema[key], wrapper: colWrapper}
      this.wrapperOption(option); //添加常用属性引用别名
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
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;


      if (field.isHidethis) {
        return;
      }

      //obj.formData[field.key]
      // 对于主键, 直接返回一个不可编辑的textarea
      if (this.primaryKey === field.key) {
        //FIXME：this? 2017年9月18日11:39:18 Rival
        return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key)(_react2.default.createElement(TextArea, { autosize: { minRows: 1, maxRows: 10 }, disabled: true,
          size: 'default' }))), field);
      }

      var fieldItem = this.extendConvert(option);

      if (fieldItem != null) // FIXME: 有何意义? 2017年9月18日11:40:24 Rival
        return fieldItem;
    }
  }, {
    key: 'wrapperOption',
    value: function wrapperOption(option) {
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
  }, {
    key: 'colWrapper',
    value: function colWrapper(formItem, field) {
      return null;
    }
  }]);

  return FieldConverter;
}();

exports.default = FieldConverter;
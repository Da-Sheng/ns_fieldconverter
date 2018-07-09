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

var logger = _ns_logger2.default.getLogger('CheckboxConverter');
var Option = _antd.Select.Option;
var CheckboxGroup = _antd.Checkbox.Group;

var CheckboxConverter = function () {
  function CheckboxConverter() {
    _classCallCheck(this, CheckboxConverter);
  }

  _createClass(CheckboxConverter, [{
    key: 'convert',
    value: function convert(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;

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

  }, {
    key: 'transformCheckboxConverter',
    value: function transformCheckboxConverter(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          obj = option.obj,
          wrapper = option.wrapper;


      var defalutCheckOptions = [];
      field.defalutCheck.forEach(function (option) {
        defalutCheckOptions.push({ 'label': option.label, 'value': option.value });
      });

      return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(CheckboxGroup, { options: defalutCheckOptions, onChange: obj.onCheckBoxChange }))), field);
    }
  }]);

  return CheckboxConverter;
}();

exports.default = CheckboxConverter;
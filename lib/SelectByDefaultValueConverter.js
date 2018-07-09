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

var logger = _ns_logger2.default.getLogger('SelectByDefaultValueConverter');
var Option = _antd.Select.Option;

var SelectByDefaultValueConverter = function () {
  function SelectByDefaultValueConverter() {
    _classCallCheck(this, SelectByDefaultValueConverter);
  }

  _createClass(SelectByDefaultValueConverter, [{
    key: 'convert',
    value: function convert(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;

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

  }, {
    key: 'transformSelectByDefault',
    value: function transformSelectByDefault(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          obj = option.obj,
          wrapper = option.wrapper;

      var selectOptionss = [];
      field.defaultSelect.forEach(function (option) {
        selectOptionss.push(_react2.default.createElement(
          Option,
          { key: option.value, value: option.value },
          option.name
        ));
      });

      return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(
        _antd.Select,
        {
          size: 'large',
          style: { width: 200 },
          onChange: obj.onSelectByDefaultValueChange,
          placeholder: '\u8BF7\u9009\u62E9',
          onSelect: !!field.onSelect ? field.onSelect : function () {}
        },
        selectOptionss
      ))), field);
    }
  }]);

  return SelectByDefaultValueConverter;
}();

exports.default = SelectByDefaultValueConverter;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Gonzo
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  2017年03月28日11:39:04
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _ns_logger = require('ns_logger');

var _ns_logger2 = _interopRequireDefault(_ns_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormItem = _antd.Form.Item;

var logger = _ns_logger2.default.getLogger('SelectByRequestValueConverter');
var Option = _antd.Select.Option;

var SelectByRequestValueConverter = function () {
  function SelectByRequestValueConverter() {
    _classCallCheck(this, SelectByRequestValueConverter);
  }

  _createClass(SelectByRequestValueConverter, [{
    key: 'convert',
    value: function convert(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;


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

  }, {
    key: 'transformSelectRequestValue',
    value: function transformSelectRequestValue(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          obj = option.obj,
          wrapper = option.wrapper;


      var selectOptionss = [];
      if (field.requestSelectValue) {
        field.requestSelectValue.forEach(function (option) {
          selectOptionss.push(_react2.default.createElement(
            Option,
            { key: option.key, value: option.value },
            option.name
          ));
        });
      }

      var select = obj.state.defaultSelectValue ? _react2.default.createElement(
        _antd.Select,
        _extends({
          size: 'large',
          style: { width: 200 },
          placeholder: field.placeholder,
          initialValue: field.value
        }, getFieldProps(field.key, fieldOptions)),
        selectOptionss
      ) : _react2.default.createElement(
        _antd.Select,
        _extends({
          size: 'large',
          style: { width: 200 },
          placeholder: field.placeholder
        }, getFieldProps(field.key, fieldOptions)),
        selectOptionss
      );

      return wrapper(select, field);
    }
  }]);

  return SelectByRequestValueConverter;
}();

exports.default = SelectByRequestValueConverter;
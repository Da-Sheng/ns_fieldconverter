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

var logger = _ns_logger2.default.getLogger('SelectTagConverter');

var inputType; //限制输入个数配置
var dropdownStyle; //是否显示下拉菜单

var SelectTagConverter = function () {
  function SelectTagConverter() {
    _classCallCheck(this, SelectTagConverter);

    this.onSelectTagChange = function (value) {
      //监听输入框value变化

      //inputType形如：{ typeName: 'MaxLength',nums:'200', wrongTips: '选择对象最多200个,超过则无效！',time:'3' }

      if (inputType) {
        //需要在formSchema里面设置inputType做自定义设置，详细见推送对象的formSchema
        if (inputType.typeName == "MaxLength" && value.length > inputType.nums) {
          _antd.message.error(inputType.wrongTips, inputType.time);
          value.splice(inputType.nums);
        }
      }
    };
  }

  _createClass(SelectTagConverter, [{
    key: 'convert',
    value: function convert(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;

      switch (field.dataType) {
        case 'selectMultiple':
          return this.transformSelectTag(option);
      }
    }
  }, {
    key: 'transformSelectTag',

    /**
      * 将schema中的一列转换为下拉框
      *
      * @param field
      */
    value: function transformSelectTag(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          obj = option.obj,
          wrapper = option.wrapper;
      var props = field.props;

      var selectOptionss = [];
      field.defaultSelect.forEach(function (option) {
        selectOptionss.push(_react2.default.createElement(
          Option,
          { key: option.value, value: option.value },
          option.name
        ));
      });
      inputType = field.inputType; //限制输入个数

      return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(
        _antd.Select,
        _extends({
          mode: 'multiple',
          style: { width: '100%' },
          onChange: this.onSelectTagChange.bind(this),
          placeholder: field.placeholder,
          tokenSeparators: [',', '，'] //切割规则是中文逗号也可以是英文逗号
          , initialValue: field.defaultValue
        }, props),
        selectOptionss
      ))), field);
    }
  }]);

  return SelectTagConverter;
}();

exports.default = SelectTagConverter;
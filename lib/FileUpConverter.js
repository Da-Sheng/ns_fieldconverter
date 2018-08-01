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

var logger = _ns_logger2.default.getLogger('FileUpConverter');

var FileUpConverter = function () {
  function FileUpConverter() {
    _classCallCheck(this, FileUpConverter);
  }

  _createClass(FileUpConverter, [{
    key: 'convert',
    value: function convert(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;

      switch (field.dataType) {
        case 'fileUp':
          return this.transformFileUp(option);
      }
    }

    /**
      * 将schema中的一列转换为下拉框
      *
      * @param field
      */

  }, {
    key: 'transformFileUp',
    value: function transformFileUp(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          obj = option.obj,
          wrapper = option.wrapper;
      var props = field.props;

      var imageFileUpUrl = field.fileUpUrl;
      var OPTION_IMAGE = 0x1;
      var OPTION_SAVE = 0x1 << 1;
      var OPTION_MD5 = 0x1 << 2;
      var upOpt = obj.state.upOpt;
      var len = upOpt.length;
      var queryUrl = 0;
      for (var i = 0; i < len; i++) {
        switch (upOpt[i]) {
          case 'OPTION_SAVE':
            queryUrl = OPTION_SAVE | queryUrl;
            break;
          case 'OPTION_MD5':
            queryUrl = OPTION_MD5 | queryUrl;
            break;
        }
      }
      var url = imageFileUpUrl + '?requestFlag=' + queryUrl + '&responseFlag=' + obj.responseStatus;
      return wrapper( //给文件上传功能包装成表单
      _extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(
        _antd.Upload,
        _extends({ action: url, onChange: obj.onFileUpChange, fileList: obj.state.fileObjs, houZhui: obj.houZhui }, props),
        _react2.default.createElement(
          _antd.Button,
          { type: 'ghost'
          },
          _react2.default.createElement(_antd.Icon, { type: 'upload' }),
          ' \u4E0A\u4F20\u6587\u4EF6'
        )
      ))), field);
    }
  }]);

  return FileUpConverter;
}();

exports.default = FileUpConverter;
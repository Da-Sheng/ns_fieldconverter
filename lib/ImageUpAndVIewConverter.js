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

var logger = _ns_logger2.default.getLogger('ImageUpAndVIewConverter');

var ImageUpAndVIewConverter = function () {
  function ImageUpAndVIewConverter() {
    _classCallCheck(this, ImageUpAndVIewConverter);
  }

  _createClass(ImageUpAndVIewConverter, [{
    key: 'convert',
    value: function convert(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;

      switch (field.dataType) {
        case 'imageFileUpAndView':
          return this.transformImageFile(option);
      }
    }
  }, {
    key: 'beforeUpload',
    value: function beforeUpload(file) {
      var isJPG = file.type === 'image/jpeg';
      var isPNG = file.type === 'image/png';
      var isGIF = file.type === 'image/gif';
      var isBMP = file.type === 'image/bmp';
      if (!isJPG && !isPNG && !isGIF && !isBMP) {
        _antd.notification.error({
          message: '请上传正确的图片文件',
          description: '系统支持jpg、png、gif、bmp，4种文件格式' });
      }
      return isJPG || isPNG || isGIF || isBMP;
    }
    /**
     * 将schema中的一列转换为下拉框
     *
     * @param field
     */

  }, {
    key: 'transformImageFile',
    value: function transformImageFile(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          obj = option.obj,
          wrapper = option.wrapper;

      var imageFileUpUrl = field.imageFileUpUrl;
      var OPTION_IMAGE = 0x1;
      var OPTION_SAVE = 0x1 << 1;
      var OPTION_MD5 = 0x1 << 2;
      var upOpt = obj.state.upOpt;
      var len = upOpt ? upOpt.length : 0;
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
      var bpButton = _react2.default.createElement(
        _antd.Button,
        { type: 'ghost' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'plus' }),
          _react2.default.createElement(
            'div',
            { className: 'ant-upload-text' },
            '\u70B9\u51FB\u4E0A\u4F20'
          )
        )
      );
      // console.log('obj',obj)
      return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Upload,
          {
            action: url,
            listType: 'picture-card',
            fileList: obj.state.fileList,
            onChange: obj.onImageFileChange,
            onRemove: obj.onRemove,
            onPreview: obj.handlePreview },
          obj.state.fileListSize ? "" : bpButton
        ),
        _react2.default.createElement(
          _antd.Modal,
          { visible: obj.state.previewVisible, footer: null, onCancel: obj.handleCancel },
          _react2.default.createElement('img', { alt: 'example', style: { width: '100%' }, src: obj.state.previewImage })
        )
      ))), field);
    }
  }]);

  return ImageUpAndVIewConverter;
}();

exports.default = ImageUpAndVIewConverter;
//# sourceMappingURL=ImageUpAndVIewConverter.js.map
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

var logger = _ns_logger2.default.getLogger('ImageFileConverter');

var ImageFileConverter = function () {
  function ImageFileConverter() {
    _classCallCheck(this, ImageFileConverter);
  }

  _createClass(ImageFileConverter, [{
    key: 'convert',


    // options = {
    //   obj: InnerTable(this)
    //   field: formSchema[key]
    //   wrapper: colWrapper
    //   getFieldProps: InnerTable(this).getFieldProps  见../../DBTable/index ：401
    //   fieldOptions: {
    //     rules: field.rules,
    //     initialValue: field.initialValue,
    //     valuePropName: field.valuePropName
    //   }
    // }
    value: function convert(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;

      switch (field.dataType) {
        case 'imageFile':
          return this.transformImageFile(option);
      }
    }

    /**
      * 将schema中的一列转换为下拉框
      *
      * @param field
      */
    // transformImageFile(option) {
    //   const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
    //   return wrapper((
    //         {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<Upload action={field.imageFileUpUrl}  onChange={obj.onImageFileChange} fileList={obj.state.fileList}  >
    //           <Button type="ghost">
    //             <Icon type="upload" /> 上传图片
    //           </Button>
    //         </Upload>)}
    //   ), field);
    // }

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

    // options = {
    //   obj: InnerTable(this)
    //   field: formSchema[key]
    //   wrapper: colWrapper
    //   getFieldProps: InnerTable(this).getFieldProps  见../../DBTable/index ：401
    //   fieldOptions: {
    //     rules: field.rules,
    //     initialValue: field.initialValue,
    //     valuePropName: field.valuePropName
    //   }
    // }

  }, {
    key: 'transformImageFile',
    value: function transformImageFile(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          obj = option.obj,
          wrapper = option.wrapper;
      var props = field.props;

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

      // colWrapper(formItem, field) {
      //   return (
      //     <FormItem key={field.key}
      //               className={field.formItemClassName}
      //               label={field.title}
      //               labelCol={field.labelCol != undefined ? field.labelCol : {span: 6}}
      //               wrapperCol={ field.wrapperCol != undefined  ? field.wrapperCol : {span : 18} }>
      //       {formItem}
      //     </FormItem>
      //   );
      // }


      // options = {
      //   obj: InnerTable(this)
      //   field: formSchema[key]
      //   wrapper: colWrapper
      //   getFieldProps: InnerTable(this).getFieldProps  见../../DBTable/index ：401
      //   fieldOptions: {
      //     rules: field.rules,
      //     initialValue: field.initialValue,
      //     valuePropName: field.valuePropName
      //   }
      // }


      return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(
        _antd.Upload,
        _extends({ beforeUpload: this.beforeUpload,
          action: url,
          onChange: obj.onImageFileChange,
          fileList: obj.state.fileList,
          disabled: field.disabled,
          hdisabled: obj.props.formItemsConfig && obj.props.formItemsConfig[field.key] && obj.props.formItemsConfig[field.key].disabled
        }, props),
        _react2.default.createElement(
          _antd.Button,
          { type: 'ghost',
            disabled: field.disabled,
            hdisabled: obj.props.formItemsConfig && obj.props.formItemsConfig[field.key] && obj.props.formItemsConfig[field.key].disabled },
          _react2.default.createElement(_antd.Icon, { type: 'upload' }),
          ' \u4E0A\u4F20\u56FE\u7247'
        )
      ))), field);
    }
  }]);

  return ImageFileConverter;
}();

exports.default = ImageFileConverter;
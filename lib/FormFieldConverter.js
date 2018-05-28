'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _ns_logger = require('ns_logger');

var _ns_logger2 = _interopRequireDefault(_ns_logger);

var _FieldConverter2 = require('./FieldConverter');

var _FieldConverter3 = _interopRequireDefault(_FieldConverter2);

var _BaseElementConverter = require('./BaseElementConverter');

var _BaseElementConverter2 = _interopRequireDefault(_BaseElementConverter);

var _UploadElementConverter = require('./UploadElementConverter');

var _UploadElementConverter2 = _interopRequireDefault(_UploadElementConverter);

var _QueryElementConverter = require('./QueryElementConverter');

var _QueryElementConverter2 = _interopRequireDefault(_QueryElementConverter);

var _ImageFileConverter = require('./ImageFileConverter');

var _ImageFileConverter2 = _interopRequireDefault(_ImageFileConverter);

var _FileUpConverter = require('./FileUpConverter');

var _FileUpConverter2 = _interopRequireDefault(_FileUpConverter);

var _SelectTagConverter = require('./SelectTagConverter');

var _SelectTagConverter2 = _interopRequireDefault(_SelectTagConverter);

var _SelectByDefaultValueConverter = require('./SelectByDefaultValueConverter');

var _SelectByDefaultValueConverter2 = _interopRequireDefault(_SelectByDefaultValueConverter);

var _ResponseDataConverter = require('./ResponseDataConverter');

var _ResponseDataConverter2 = _interopRequireDefault(_ResponseDataConverter);

var _CheckboxConverter = require('./CheckboxConverter');

var _CheckboxConverter2 = _interopRequireDefault(_CheckboxConverter);

var _RadioConverter = require('./RadioConverter');

var _RadioConverter2 = _interopRequireDefault(_RadioConverter);

var _SelectByRequestValueConverter = require('./SelectByRequestValueConverter');

var _SelectByRequestValueConverter2 = _interopRequireDefault(_SelectByRequestValueConverter);

var _ImageUpAndVIewConverter = require('./ImageUpAndVIewConverter');

var _ImageUpAndVIewConverter2 = _interopRequireDefault(_ImageUpAndVIewConverter);

var _OneImageUpAndVIewConverter = require('./OneImageUpAndVIewConverter');

var _OneImageUpAndVIewConverter2 = _interopRequireDefault(_OneImageUpAndVIewConverter);

var _SelectMultipleConverter = require('./SelectMultipleConverter');

var _SelectMultipleConverter2 = _interopRequireDefault(_SelectMultipleConverter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zxh on 2016/12/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var FormItem = _antd.Form.Item;

var logger = _ns_logger2.default.getLogger('FormFieldConverter');

var FormFieldConverter = function (_FieldConverter) {
  _inherits(FormFieldConverter, _FieldConverter);

  function FormFieldConverter() {
    _classCallCheck(this, FormFieldConverter);

    var _this = _possibleConstructorReturn(this, (FormFieldConverter.__proto__ || Object.getPrototypeOf(FormFieldConverter)).call(this));

    _this.addConverter(new _BaseElementConverter2.default()); //select || textarea
    _this.addConverter(new _UploadElementConverter2.default()); //upload
    _this.addConverter(new _QueryElementConverter2.default()); //FIXME: showType? 2017年9月18日11:45:52 Rival
    _this.addConverter(new _ImageFileConverter2.default()); //imageFile
    _this.addConverter(new _FileUpConverter2.default()); //fileUp
    _this.addConverter(new _SelectTagConverter2.default()); //selectTag
    _this.addConverter(new _SelectByDefaultValueConverter2.default()); //selectByDefaultValue
    _this.addConverter(new _ResponseDataConverter2.default()); //responseData
    _this.addConverter(new _CheckboxConverter2.default()); //checkbox
    _this.addConverter(new _RadioConverter2.default()); //radio
    _this.addConverter(new _SelectByRequestValueConverter2.default()); //selectByRequestValue
    _this.addConverter(new _ImageUpAndVIewConverter2.default()); //imageFileUpAndView
    _this.addConverter(new _OneImageUpAndVIewConverter2.default()); //OneImageUpAndVIewConverter
    _this.addConverter(new _SelectMultipleConverter2.default()); //SelectMultipleConverter
    return _this;
  }

  /**
   * 辅助函数
   *
   * @param formItem
   * @param field
   * @returns {XML}
   */

  /**
   * 修订原因：form表单要动态加载(已确认 隐藏|显示交替)
   * 修订时间：2017年10月18日16:49:27
   * 修订人：Rival
   */


  _createClass(FormFieldConverter, [{
    key: 'colWrapper',
    value: function colWrapper(formItem, field) {
      return _react2.default.createElement(
        FormItem,
        { key: field.key,
          className: field.formItemClassName,
          label: field.title,
          labelCol: field.labelCol != undefined ? field.labelCol : { span: 6 },
          wrapperCol: field.wrapperCol != undefined ? field.wrapperCol : { span: 18 },
          style: {
            display: formItem.props.disabled ? 'none' : 'block'
          } },
        formItem
      );
    }
  }]);

  return FormFieldConverter;
}(_FieldConverter3.default);

exports.default = FormFieldConverter;
//# sourceMappingURL=FormFieldConverter.js.map
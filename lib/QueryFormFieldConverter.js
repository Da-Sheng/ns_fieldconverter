'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _ns_logger = require('ns_logger');

var _ns_logger2 = _interopRequireDefault(_ns_logger);

var _FieldConverter2 = require('./FieldConverter');

var _FieldConverter3 = _interopRequireDefault(_FieldConverter2);

var _QueryElementConverter = require('./QueryElementConverter');

var _QueryElementConverter2 = _interopRequireDefault(_QueryElementConverter);

var _BaseElementConverter = require('./BaseElementConverter');

var _BaseElementConverter2 = _interopRequireDefault(_BaseElementConverter);

var _ImageViewConverter = require('./ImageViewConverter');

var _ImageViewConverter2 = _interopRequireDefault(_ImageViewConverter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zxh on 2016/12/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var FormItem = _antd.Form.Item;

var QueryFormFieldConverter = function (_FieldConverter) {
  _inherits(QueryFormFieldConverter, _FieldConverter);

  function QueryFormFieldConverter() {
    _classCallCheck(this, QueryFormFieldConverter);

    var _this = _possibleConstructorReturn(this, (QueryFormFieldConverter.__proto__ || Object.getPrototypeOf(QueryFormFieldConverter)).call(this));

    _this.addConverter(new _ImageViewConverter2.default());
    _this.addConverter(new _QueryElementConverter2.default());
    _this.addConverter(new _BaseElementConverter2.default());
    return _this;
  }

  /**
   * 辅助函数
   *
   * @param formItem
   * @param field
   * @returns {XML}
   */


  _createClass(QueryFormFieldConverter, [{
    key: 'colWrapper',
    value: function colWrapper(formItem, field) {
      var _field$labelColSize = field.labelColSize,
          labelColSize = _field$labelColSize === undefined ? 6 : _field$labelColSize,
          _field$wrapperColSize = field.wrapperColSize,
          wrapperColSize = _field$wrapperColSize === undefined ? 18 : _field$wrapperColSize,
          _field$FormItemProps = field.FormItemProps,
          FormItemProps = _field$FormItemProps === undefined ? {} : _field$FormItemProps;

      return _react2.default.createElement(
        _antd.Col,
        { key: field.key, sm: 8 },
        _react2.default.createElement(
          FormItem,
          _extends({ extra: field.extra, key: field.key, label: field.title,
            labelCol: { span: labelColSize }, wrapperCol: { span: wrapperColSize }
          }, FormItemProps),
          formItem
        )
      );
    }
  }]);

  return QueryFormFieldConverter;
}(_FieldConverter3.default);

exports.default = QueryFormFieldConverter;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by zxh on 2016/12/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _FormFieldConverter = require('./FormFieldConverter');

var _FormFieldConverter2 = _interopRequireDefault(_FormFieldConverter);

var _QueryFormFieldConverter = require('./QueryFormFieldConverter');

var _QueryFormFieldConverter2 = _interopRequireDefault(_QueryFormFieldConverter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import 'antd/dist/antd.min.css'

var FormItem = _antd.Form.Item;

var FieldConverterFactory = function () {
  function FieldConverterFactory() {
    _classCallCheck(this, FieldConverterFactory);
  }

  _createClass(FieldConverterFactory, null, [{
    key: 'getConverter',
    value: function getConverter(type) {

      var converter = null;

      if (this.converterObj[type] == null) {
        if (type == this.FormFieldConverter) {
          converter = new _FormFieldConverter2.default();
        } else if (type == this.QueryFormFieldConverter) {
          converter = new _QueryFormFieldConverter2.default();
        }
        this.converterObj[type] = converter;
      } else {
        converter = this.converterObj[type];
      }

      return converter;
    }
  }]);

  return FieldConverterFactory;
}();

FieldConverterFactory.FormFieldConverter = 1;
FieldConverterFactory.QueryFormFieldConverter = 2;
FieldConverterFactory.converterObj = {};
exports.default = FieldConverterFactory;
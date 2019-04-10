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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _antd = require('antd');

var _ns_logger = require('ns_logger');

var _ns_logger2 = _interopRequireDefault(_ns_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormItem = _antd.Form.Item;
var RangePicker = _antd.DatePicker.RangePicker;

var Option = _antd.Select.Option;
var RadioGroup = _antd.Radio.Group;

var logger = _ns_logger2.default.getLogger('QueryElementFieldConverter');

var QueryElementFieldConverter = function () {
  function QueryElementFieldConverter() {
    _classCallCheck(this, QueryElementFieldConverter);

    this.betweenColWrapper = function (beginFormItem, endFormItem, field) {
      // 布局真是个麻烦事
      // col内部又用了一个row做布局
      // const {getFieldProps} = this.props.form;
      return _react2.default.createElement(
        _antd.Col,
        { key: field.key + 'Begin', sm: 8 },
        _react2.default.createElement(
          Row,
          null,
          _react2.default.createElement(
            _antd.Col,
            { span: 16 },
            _react2.default.createElement(
              FormItem,
              { key: field.key + 'Begin', label: field.title, labelCol: { span: 15 }, wrapperCol: { span: 9 } },
              beginFormItem
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7, offset: 1 },
            _react2.default.createElement(
              FormItem,
              { key: field.key + 'End', labelCol: { span: 10 }, wrapperCol: { span: 14 } },
              endFormItem
            )
          )
        )
      );
    };
  }

  _createClass(QueryElementFieldConverter, [{
    key: 'transformSelect',


    /**
     * 将schema中的一列转换为下拉框
     *
     * @param field
     */
    value: function transformSelect(option) {
      // TODO: 这里是否要做schema校验
      var options = [];
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;
      var props = field.props;

      var id = 0;
      logger.debug('transform field %o to Select component', field);
      if (typeof field.options === 'function') {
        field.options = field.options();
      }
      field.options.forEach(function (option) {
        id++;
        options.push(_react2.default.createElement(
          Option,
          { key: id, value: option.value },
          option.name
        ));
      });

      return wrapper(_extends({}, obj.props.form.getFieldDecorator(field.key, fieldOptions)(_react2.default.createElement(
        _antd.Select,
        _extends({ placeholder: field.placeholder || '请选择',
          size: 'default',
          mode: field.mode,
          showSearch: field.showSearch,
          filterOption: field.filterOption || true,
          optionLabelProp: field.optionLabelProp || 'children'
        }, props),
        options
      ))), field);
    }

    /**
     * 将schema中的一列转换为单选框
     *
     * @param field
     */

  }, {
    key: 'transformRadio',
    value: function transformRadio(option) {
      var options = [];
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper;


      logger.debug('transform field %o to Radio component', field);
      field.options.forEach(function (option) {
        options.push(_react2.default.createElement(
          _antd.Radio,
          { key: option.key, value: option.key },
          option.value
        ));
      });

      return wrapper(_react2.default.createElement(
        RadioGroup,
        _extends({}, getFieldProps(field.key, { initialValue: field.initialValue }), {
          defaultValue: field.initialValue }),
        options
      ), field);
    }

    /**
     * 将schema中的一列转换为checkbox
     *
     * @param field
     */

  }, {
    key: 'transformCheckbox',
    value: function transformCheckbox(option) {
      var options = [];
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper;


      logger.debug('transform field %o to Checkbox component', field);
      field.options.forEach(function (option) {
        options.push({ label: option.value, value: option.key });
      });

      return wrapper(_react2.default.createElement(CheckboxGroup, _extends({ options: options }, getFieldProps(field.key))), field);
    }

    /**
     * 转换为下拉多选框
     *
     * @param field
     * @returns {XML}
     */

  }, {
    key: 'transformMultiSelect',
    value: function transformMultiSelect(option) {
      var options = [];
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper;


      logger.debug('transform field %o to MultipleSelect component', field);
      field.options.forEach(function (option) {
        options.push(_react2.default.createElement(
          Option,
          { key: option.key, value: option.key },
          option.value
        ));
      });

      return wrapper(_react2.default.createElement(
        _antd.Select,
        _extends({ mode: 'multiple', placeholder: field.placeholder || '请选择', size: 'default' }, getFieldProps(field.key)),
        options
      ), field);
    }

    /**
     * 也是个辅助函数, 由于是范围查询, 输入的formItem是两个, 一个用于begin一个用于end
     *
     * @param beginFormItem
     * @param endFormItem
     * @param field
     * @returns {XML}
     */

  }, {
    key: 'transformBetween',


    /**
     * between类型比较特殊, 普通元素每个宽度是8, int和float的between元素宽度也是8, 但datetime类型的between元素宽度是16
     * 否则排版出来不能对齐, 太丑了, 逼死强迫症
     * 而且普通的transform函数返回是一个object, 而这个函数返回是一个array, 就是因为datetime的between要占用两列
     *
     * @param field
     */
    value: function transformBetween(option) {
      var cols = [];
      var beginFormItem = void 0;
      var endFormItem = void 0;
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper;
      var props = field.props;


      switch (field.dataType) {
        case 'int':
          logger.debug('transform field %o to integer BETWEEN component', field);
          beginFormItem = _react2.default.createElement(_antd.InputNumber, _extends({ size: 'default',
            placeholder: field.placeholderBegin || '最小值' }, getFieldProps(field.key + 'Begin')));
          endFormItem = _react2.default.createElement(_antd.InputNumber, _extends({ size: 'default',
            placeholder: field.placeholderEnd || '最大值' }, getFieldProps(field.key + 'End')));
          cols.push(this.betweenColWrapper(beginFormItem, endFormItem, field));
          break;
        case 'float':
          logger.debug('transform field %o to float BETWEEN component', field);
          beginFormItem = _react2.default.createElement(_antd.InputNumber, _extends({ step: 0.01, size: 'default',
            placeholder: field.placeholderBegin || '最小值' }, getFieldProps(field.key + 'Begin')));
          endFormItem = _react2.default.createElement(_antd.InputNumber, _extends({ step: 0.01, size: 'default',
            placeholder: field.placeholderEnd || '最大值' }, getFieldProps(field.key + 'End')));
          cols.push(this.betweenColWrapper(beginFormItem, endFormItem, field));
          break;
        // datetime类型的between要占用两个Col
        // 不写辅助函数了, 直接这里写jsx吧...
        case 'datetime':
          logger.debug('transform field %o to datetime BETWEEN component', field);
          cols.push(_react2.default.createElement(
            _antd.Col,
            { key: field.key + 'Begin', span: 8 },
            _react2.default.createElement(
              FormItem,
              { key: field.key + 'Begin', label: field.title, labelCol: { span: 6 }, wrapperCol: { span: 18 } },
              _react2.default.createElement(_antd.DatePicker, _extends({ format: 'YYYY-MM-DD',
                placeholder: field.placeholderBegin || '开始日期' }, getFieldProps(field.key + 'Begin'), props))
            )
          ));
          cols.push(_react2.default.createElement(
            _antd.Col,
            { key: field.key + 'End', span: 8 },
            _react2.default.createElement(
              FormItem,
              { key: field.key + 'End', labelCol: { span: 6 }, wrapperCol: { span: 18 } },
              _react2.default.createElement(_antd.DatePicker, _extends({ format: 'YYYY-MM-DD',
                placeholder: field.placeholderEnd || '结束日期' }, getFieldProps(field.key + 'End'), props))
            )
          ));
          break;
        case 'datetimes':
          logger.debug('transform field %o to datetime BETWEEN component', field);
          cols.push(_react2.default.createElement(
            _antd.Col,
            { key: '' + field.key, span: 16 },
            _react2.default.createElement(
              FormItem,
              { key: '' + field.key, label: field.title, labelCol: { span: 3 }, wrapperCol: { span: 18 } },
              _react2.default.createElement(RangePicker, _extends({ format: 'YYYY-MM-DD HH:mm:ss', showTime: { defaultValue: [(0, _moment2.default)('00:00:00', 'HH:mm:ss'), (0, _moment2.default)('23:59:59', 'HH:mm:ss')] },
                placeholder: ['开始日期', '结束日期'] }, getFieldProps('' + field.key), props))
            )
          ));
          break;
        default:
          // 理论上来说不会出现这种情况
          logger.error('unknown dataType: %s', field.dataType);
      }
      return cols;
    }
  }, {
    key: 'convert',
    value: function convert(option) {
      var options = [];

      var items = null;

      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper;


      switch (field.showType) {
        case 'select':
          items = this.transformSelect(option);
          break;
        case 'radio':
          items = this.transformRadio(option);
          break;
        case 'checkbox':
          items = this.transformCheckbox(option);
          break;
        case 'multiSelect':
          items = this.transformMultiSelect(option);
          break;
        case 'between':
          items = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.transformBetween(option)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var col = _step.value;
              // between类型比较特殊, 返回的是一个数组
              items.push(col);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          break;
        case 'betweens':
          items = this.transformBetween(option)[0];
          break;
      }
      return items;
    }
  }]);

  return QueryElementFieldConverter;
}();

exports.default = QueryElementFieldConverter;
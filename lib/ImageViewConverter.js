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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zxh on 2016/12/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// import ImageView from '../../components/ImageView';  //查看图片组件


//图片的查看详情组件

var ImageView = function (_React$Component) {
  _inherits(ImageView, _React$Component);

  function ImageView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ImageView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImageView.__proto__ || Object.getPrototypeOf(ImageView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      imgList: [], //显示的图片列表
      imageViewVisible: false
    }, _this.imageView = function () {
      _this.setState({ imageViewVisible: true });
      var imgs = _this.props.images;
      var imgList = void 0;
      if (imgs.length > 0) {
        imgList = imgs.map(function (node) {
          return _react2.default.createElement('img', { src: node });
        });
      } else {
        imgList = "未添加图片";
      }

      _this.setState({ imgList: imgList });
    }, _this.hideModal = function () {
      _this.setState({ imageViewVisible: false });
    }, _this.handleModalOk = function () {
      _this.setState({ imageViewVisible: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ImageView, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          { href: 'javascript:void(0)', onClick: this.imageView },
          '\u67E5\u770B\u56FE\u7247'
        ),
        _react2.default.createElement(
          _antd.Modal,
          { title: '\u67E5\u770B\u56FE\u7247', visible: this.state.imageViewVisible, onOk: this.handleModalOk,
            onCancel: this.hideModal },
          this.state.imgList
        )
      );
    }
  }]);

  return ImageView;
}(_react2.default.Component);

var logger = _ns_logger2.default.getLogger('HrefElementConverter');

var HrefElementConverter = function () {
  function HrefElementConverter() {
    _classCallCheck(this, HrefElementConverter);
  }

  _createClass(HrefElementConverter, [{
    key: 'convert',
    value: function convert(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          wrapper = option.wrapper,
          obj = option.obj;

      switch (field.dataType) {
        case 'imageView':
          return this.transformImgView(option);
      }
    }

    /**
      * 将schema中的一列转换为下拉框
      *
      * @param field
      */

  }, {
    key: 'transformImgView',
    value: function transformImgView(option) {
      var getFieldProps = option.getFieldProps,
          field = option.field,
          fieldOptions = option.fieldOptions,
          obj = option.obj,
          wrapper = option.wrapper;

      logger.debug('transform field %o to datetime input', field);
      return wrapper(_react2.default.createElement(ImageView, { images: field.images }), field);
    }
  }]);

  return HrefElementConverter;
}();

exports.default = HrefElementConverter;
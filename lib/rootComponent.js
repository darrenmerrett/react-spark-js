'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reducers = require('reactApp/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _reactSparkProfileImage = require('./reactSparkProfileImage');

var _reactSparkProfileImage2 = _interopRequireDefault(_reactSparkProfileImage);

var _notificationsButton = require('./notificationsButton');

var _notificationsButton2 = _interopRequireDefault(_notificationsButton);

var _App = require('reactApp/App');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RootComponent = function (_React$Component) {
	_inherits(RootComponent, _React$Component);

	function RootComponent(props, context) {
		_classCallCheck(this, RootComponent);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RootComponent).call(this, props, context));

		var reds = _reducers2.default;

		_this.store = (0, _redux.createStore)(reds);

		return _this;
	}

	_createClass(RootComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {

			this.store.dispatch({

				type: 'STORE_SPARKSCRIPTVARIABLES',
				variables: window.Spark

			});

			_reactDom2.default.render(_react2.default.createElement(_notificationsButton2.default, { store: this.store }), document.querySelector('notifications-modal'));
			_reactDom2.default.render(_react2.default.createElement(_reactSparkProfileImage2.default, { store: this.store }), document.querySelector('react-spark-profile-image'));

			var findAncestor = function findAncestor(el, cls) {
				while ((el = el.parentElement) && !el.classList.contains(cls)) {}
				return el;
			};

			var closeDropdowns = function closeDropdowns(exclude) {

				var dropdowns = document.getElementsByClassName('dropdown');

				for (var ii = 0; ii < dropdowns.length; ii++) {

					if (dropdowns[ii] !== exclude) {

						dropdowns[ii].classList.remove('open');
					}
				}
			};

			var els = document.getElementsByClassName('dropdown-toggle');

			for (var i = 0; i < els.length; i++) {

				els[i].onclick = function (e) {

					e.preventDefault();

					e.stopPropagation();

					var dropdown = findAncestor(this, 'dropdown');

					dropdown.classList.toggle('open');

					closeDropdowns(dropdown);
				};
			}

			document.body.onclick = function () {

				closeDropdowns();
			};
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2.default.createElement(
				_reactRedux.Provider,
				{ store: this.store },
				_react2.default.createElement(_App.App, null)
			);
		}
	}]);

	return RootComponent;
}(_react2.default.Component);

exports.default = RootComponent;


var el = document.querySelector('reactsparkapp');

if (el) {

	_reactDom2.default.render(_react2.default.createElement(RootComponent, null), el);
}
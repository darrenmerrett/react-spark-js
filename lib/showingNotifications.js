'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowingNotifications = function (_React$Component) {
    _inherits(ShowingNotifications, _React$Component);

    function ShowingNotifications(props) {
        _classCallCheck(this, ShowingNotifications);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShowingNotifications).call(this, props));

        _this.state = {
            notifications: props.notifications
        };

        return _this;
    }

    _createClass(ShowingNotifications, [{
        key: 'render',
        value: function render() {

            var notifications = [];

            var nots = this.state.notifications;

            for (var i = 0; i < nots.length; i++) {

                var notification = nots[i];

                var parsed_body = { __html: notification.parsed_body };

                notifications.push(_react2.default.createElement(
                    'div',
                    { className: 'notification', key: notification.id },
                    _react2.default.createElement(
                        'figure',
                        null,
                        notification.creator ? _react2.default.createElement('img', { src: notification.creator.photo_url, className: 'spark-profile-photo' }) : _react2.default.createElement(
                            'span',
                            { 'v-else': true, className: 'fa-stack fa-2x' },
                            _react2.default.createElement('i', { className: 'fa fa-circle fa-stack-2x' }),
                            _react2.default.createElement('i', { className: 'fa-stack-1x fa-inverse' + notification.icon })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'notification-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'meta' },
                            _react2.default.createElement(
                                'p',
                                { className: 'title' },
                                notification.creator ? _react2.default.createElement(
                                    'span',
                                    null,
                                    notification.creator.name
                                ) : _react2.default.createElement(
                                    'span',
                                    null,
                                    'Spark'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'date' },
                                (0, _moment2.default)(notification.created_at).fromNow()
                            )
                        ),
                        _react2.default.createElement('div', { className: 'notification-body', dangerouslySetInnerHTML: parsed_body }),
                        !notification.action_text ? '' : _react2.default.createElement(
                            'a',
                            { href: notification.action_url, className: 'btn btn-primary' },
                            notification.action_text
                        )
                    )
                ));
            }

            return _react2.default.createElement(
                'div',
                null,
                notifications
            );
        }
    }]);

    return ShowingNotifications;
}(_react2.default.Component);

exports.default = ShowingNotifications;
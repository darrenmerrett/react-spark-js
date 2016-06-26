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

var ShowingAnnouncements = function (_React$Component) {
    _inherits(ShowingAnnouncements, _React$Component);

    function ShowingAnnouncements(props) {
        _classCallCheck(this, ShowingAnnouncements);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShowingAnnouncements).call(this, props));

        _this.state = {
            announcements: props.announcements
        };

        return _this;
    }

    _createClass(ShowingAnnouncements, [{
        key: 'render',
        value: function render() {

            var announcements = [];

            var nots = this.state.announcements;

            for (var i = 0; i < nots.length; i++) {

                var announcement = nots[i];

                var parsed_body = { __html: announcement.parsed_body };

                announcements.push(_react2.default.createElement(
                    'div',
                    { key: announcement.id, className: 'notification' },
                    _react2.default.createElement(
                        'figure',
                        null,
                        _react2.default.createElement('img', { src: announcement.creator.photo_url, className: 'spark-profile-photo' })
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
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    announcement.creator.name
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'date' },
                                (0, _moment2.default)(announcement.created_at).fromNow()
                            )
                        ),
                        _react2.default.createElement('div', { className: 'notification-body', dangerouslySetInnerHTML: parsed_body }),
                        !announcement.action_text ? '' : _react2.default.createElement(
                            'a',
                            { href: announcement.action_url, className: 'btn btn-primary' },
                            announcement.action_text
                        )
                    )
                ));
            }

            return _react2.default.createElement(
                'div',
                null,
                announcements
            );
        }
    }]);

    return ShowingAnnouncements;
}(_react2.default.Component);

exports.default = ShowingAnnouncements;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Modal = require('react-dm-bootstrap/lib/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _showingNotifications = require('./showingNotifications');

var _showingNotifications2 = _interopRequireDefault(_showingNotifications);

var _showingAnnouncements = require('./showingAnnouncements');

var _showingAnnouncements2 = _interopRequireDefault(_showingAnnouncements);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationsModal = function (_React$Component) {
    _inherits(NotificationsModal, _React$Component);

    function NotificationsModal() {
        _classCallCheck(this, NotificationsModal);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationsModal).call(this));

        _this.state = {
            loadingNotifications: true,
            showingNotifications: true,
            showingAnnouncements: false,
            user: window.Spark.state.user
        };

        return _this;
    }

    _createClass(NotificationsModal, [{
        key: 'fetch',
        value: function (_fetch) {
            function fetch(_x, _x2, _x3) {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function (url, method, data) {

            var headers = {};

            headers['X-XSRF-TOKEN'] = _jsCookie2.default.get('XSRF-TOKEN');
            headers['X-Requested-With'] = 'XMLHttpRequest';

            if (method != "GET") {

                headers['Accept'] = 'application/json';
                headers['Content-Type'] = 'application/json';
            }

            return fetch(url, {
                method: method,
                headers: headers,
                credentials: 'same-origin',
                body: JSON.stringify(data)
            });
        })
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.fetch('/notifications/recent', 'GET').then(function (response) {

                return response.json();
            }).then(function (data) {

                _this2.setState({
                    notifications: data,
                    loadingNotifications: false
                });
            }).catch(function () {});
        }
    }, {
        key: 'openNotificationsModal',
        value: function openNotificationsModal(e) {

            e.stopPropagation();
            e.preventDefault();

            this.notificationsModal.openModal();

            if (this.state.showingNotifications) {

                this.showNotifications();
            }
        }
    }, {
        key: 'showNotifications',
        value: function showNotifications(announcements) {

            this.setState({
                showingNotifications: announcements ? false : true,
                showingAnnouncements: announcements ? true : false
            });

            announcements ? this.updateLastReadAnnouncementsTimestamp() : this.markNotificationsAsRead();
        }
    }, {
        key: 'activeNotifications',
        value: function activeNotifications() {
            if (!this.state.notifications) {
                return [];
            }

            if (this.state.showingNotifications) {
                return this.state.notifications.notifications;
            } else {
                return this.state.notifications.announcements;
            }
        }
    }, {
        key: 'hasUnreadAnnouncements',
        value: function hasUnreadAnnouncements() {

            if (this.state.notifications && this.state.user) {

                if (!this.state.user.last_read_announcements_at) {

                    return true;
                }

                for (var i = 0; i < this.state.notifications.announcements.length; i++) {

                    if (_moment2.default.utc(this.state.user.last_read_announcements_at).isBefore(_moment2.default.utc(this.state.notifications.announcements[i].created_at))) {
                        return true;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'hasUnreadNotifications',
        value: function hasUnreadNotifications() {
            if (this.state.notifications) {

                for (var i = 0; i < this.state.notifications.notifications.length; i++) {
                    if (!this.state.notifications.notifications[i].read) {
                        return true;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'markNotificationsAsRead',
        value: function markNotificationsAsRead() {

            if (!this.hasUnreadNotifications()) {
                return;
            }

            var ids = [];

            var nots = this.state.notifications;

            for (var i = 0; i < nots.notifications.length; i++) {

                ids.push(nots.notifications[i].id);

                nots.notifications[i].read = 1;
            }

            this.setState({

                notifications: nots

            });

            this.fetch('/notifications/read', 'PUT', {

                notifications: ids

            });
        }
    }, {
        key: 'updateLastReadAnnouncementsTimestamp',
        value: function updateLastReadAnnouncementsTimestamp() {
            var _this3 = this;

            this.fetch('/user/last-read-announcements-at', 'PUT').then(function (response) {

                _this3.getUser();
            }).catch(function () {});
        }
    }, {
        key: 'getUser',
        value: function getUser() {
            var _this4 = this;

            this.fetch('/user/current', 'GET').then(function (response) {

                return response.json();
            }).then(function (data) {

                window.Spark.state.user = data;

                _this4.setState({
                    user: data
                });
            }).catch(function () {});
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var closeModal = function closeModal() {
                this.notificationsModal.closeModal();
            };

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'a',
                    { onClick: this.openNotificationsModal.bind(this), className: 'has-activity-indicator' },
                    _react2.default.createElement(
                        'div',
                        { className: 'navbar-icon' },
                        !this.hasUnreadNotifications() && !this.hasUnreadAnnouncements() ? '' : _react2.default.createElement('i', { className: 'activity-indicator' }),
                        _react2.default.createElement('i', { className: 'icon fa fa-bell' })
                    )
                ),
                _react2.default.createElement(
                    _Modal2.default,
                    {
                        className: 'docked docked-right',
                        id: 'modal-notifications',
                        ref: function ref(_ref) {
                            return _this5.notificationsModal = _ref;
                        } },
                    _react2.default.createElement(
                        _Modal2.default.Dialog,
                        null,
                        _react2.default.createElement(
                            _Modal2.default.Header,
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'btn-group' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-default' + (this.state.showingNotifications ? ' active' : ''), onClick: this.showNotifications.bind(this, 0), style: { width: '50%' } },
                                    'Notifications'
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { className: 'btn btn-default' + (this.state.showingAnnouncements ? ' active' : ''), onClick: this.showNotifications.bind(this, 1), style: { width: '50%' } },
                                    'Announcements',
                                    !this.hasUnreadAnnouncements() ? '' : _react2.default.createElement('i', { className: 'fa fa-circle text-danger p-l-xs' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _Modal2.default.Body,
                            null,
                            !this.state.loadingNotifications ? '' : _react2.default.createElement(
                                'div',
                                { className: 'alert text-center' },
                                _react2.default.createElement('i', { className: 'fa fa-btn fa-spinner fa-spin' }),
                                'Loading Notifications'
                            ),
                            this.state.loadingNotifications || this.activeNotifications().length > 0 ? '' : _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'alert alert-warning m-b-none' },
                                    'We don\'t have anything to show you right now! But when we do, we\'ll be sure to let you know. Talk to you soon!'
                                )
                            ),
                            !(this.state.showingNotifications && this.state.notifications && this.state.notifications.notifications.length > 0) ? null : _react2.default.createElement(_showingNotifications2.default, {
                                notifications: this.state.notifications.notifications
                            }),
                            !(this.state.showingAnnouncements && this.state.notifications && this.state.notifications.announcements.length > 0) ? null : _react2.default.createElement(_showingAnnouncements2.default, {
                                announcements: this.state.notifications.announcements
                            })
                        ),
                        _react2.default.createElement(
                            _Modal2.default.Footer,
                            null,
                            _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-default', onClick: closeModal.bind(this) },
                                'Close'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return NotificationsModal;
}(_react2.default.Component);

exports.default = NotificationsModal;


_reactDom2.default.render(_react2.default.createElement(NotificationsModal, null), document.querySelector('notifications-modal'));
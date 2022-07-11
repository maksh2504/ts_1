(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Form_1 = require("./Form");
var form1 = new Form_1.default(document.getElementById("form_id"));
// interface inputField {
//     type: string;
//     label: string;
//     name: string;
//     validator: any;
// }
form1.addField({
    type: 'input',
    label: 'First name:',
    name: 'firstName',
    validator: function validator(name) {
        return name.value.length > 0 && name.value.length <= 8;
    }
});
form1.addField({
    type: 'input',
    label: 'Last name:',
    name: 'lastName',
    validator: function validator(name) {
        return name.value.length > 0 && name.value.length <= 8;
    }
});
form1.addField({
    type: 'password',
    label: 'Password:',
    name: 'password',
    validator: function validator(password) {
        return password.value;
    }
});
form1.addField({
    type: 'input',
    label: 'Email:',
    name: 'email',
    validator: function validator(email) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email.value)) {
            return true;
        } else {
            console.log('Введите корректный e-mail');
            return false;
        }
    }
});
form1.addField({
    type: 'input',
    label: 'Phone:',
    name: 'phone',
    validator: function validator(phone) {
        var reg = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
        if (reg.test(phone.value)) {
            return true;
        } else console.log('Введите корректный телефон');
        return false;
    }
});
form1.addButton({
    type: 'submit',
    label: 'Submit',
    name: 'submit'
});

},{"./Form":2}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Input_1 = require("./Input");

var Form = function () {
    function Form(formElement) {
        var _this = this;

        _classCallCheck(this, Form);

        this._printForm = function () {
            for (var field in _this.formInstance) {
                console.log(field + ": " + _this.formInstance[field].element.value);
            }
        };
        this._validate = function () {
            for (var field in _this.formInstance) {
                if (!_this.formInstance[field].validate()) return false;
            }
            return true;
        };
        this._submit = function (e) {
            e.preventDefault(); // Отключает стандартный обработчик
            if (_this._validate()) {
                _this._printForm();
            }
        };
        this.formInstance = {};
        this.formElement = formElement;
        this.formElement.addEventListener("submit", this._submit);
    }

    _createClass(Form, [{
        key: "addField",
        value: function addField(_ref) {
            var type = _ref.type,
                label = _ref.label,
                name = _ref.name,
                validator = _ref.validator;

            var section = document.createElement('div');
            var inputLabel = document.createElement('label');
            inputLabel.innerHTML = label;
            section.append(inputLabel);
            var element = document.createElement('input');
            element.id = name;
            element.type = type;
            element.required = true;
            section.append(element);
            this.formElement.append(section);
            this.formInstance[name] = new Input_1.default({
                element: element,
                validator: validator,
                type: type
            });
        }
    }, {
        key: "addButton",
        value: function addButton(_ref2) {
            var type = _ref2.type,
                label = _ref2.label,
                name = _ref2.name;

            var section = document.createElement('div');
            section.id = name;
            var button = document.createElement('button');
            button.type = type;
            button.textContent = label;
            section.append(button);
            this.formElement.append(section);
        }
    }]);

    return Form;
}();

exports.default = Form;

},{"./Input":3}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var FormItem = function () {
    function FormItem(_ref) {
        var element = _ref.element,
            validator = _ref.validator,
            _ref$type = _ref.type,
            type = _ref$type === undefined ? 'input' : _ref$type,
            confirm = _ref.confirm;

        _classCallCheck(this, FormItem);

        this.element = element;
        this.validator = validator;
        this.type = type;
        this.confirm = confirm;
    }

    _createClass(FormItem, [{
        key: "validate",
        value: function validate() {
            if (this.type === 'password') {
                return this.validator(this.element, this.confirm);
            } else {
                return this.validator(this.element);
            }
        }
    }, {
        key: "value",
        get: function get() {
            var _a;
            return (_a = this.element) === null || _a === void 0 ? void 0 : _a.value;
        }
    }]);

    return FormItem;
}();

exports.default = FormItem;

},{}]},{},[1])

//# sourceMappingURL=bundle.js.map

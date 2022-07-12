(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Form_1 = require("../Form/Form");
var form1 = new Form_1.default(document.getElementById("form_id"));
form1.addField({
    type: 'input',
    label: 'First name1:',
    name: 'firstName1',
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
        return password.value !== "";
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

},{"../Form/Form":3}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
exports.FormItem = void 0;

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
            return this.element.value;
        }
    }]);

    return FormItem;
}();

exports.FormItem = FormItem;

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var FormItem_1 = require("../FormItem/FormItem");

var Form = function () {
    function Form(formElement) {
        var _this = this;

        _classCallCheck(this, Form);

        this._printForm = function () {
            for (var field in _this.formInstance) {
                console.log(field + ": " + _this.formInstance[field].value); // .value
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
        value: function addField(formInput) {
            var section = document.createElement('div');
            var inputLabel = document.createElement('label');
            inputLabel.innerHTML = formInput.label;
            section.append(inputLabel);
            var element = document.createElement('input');
            element.id = formInput.name;
            element.type = formInput.type;
            element.required = true;
            section.append(element);
            this.formElement.append(section);
            console.log(formInput.name);
            console.log(this.formInstance);
            this.formInstance[formInput.name] = new FormItem_1.FormItem({
                element: element,
                validator: formInput.validator,
                type: formInput.type
            });
        }
    }, {
        key: "addButton",
        value: function addButton(formButton) {
            var section = document.createElement('div');
            section.id = formButton.name;
            var button = document.createElement('button');
            button.type = formButton.type;
            button.textContent = formButton.label;
            section.append(button);
            this.formElement.append(section);
        }
    }]);

    return Form;
}();

exports.default = Form;

},{"../FormItem/FormItem":2}]},{},[1])

//# sourceMappingURL=bundle.js.map

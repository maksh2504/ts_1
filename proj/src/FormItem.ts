interface IFormItem {
    element: HTMLElement;
    validator: (el: HTMLElement, conf?: object) => boolean;
    type: string;
    confirm: object
}

class FormItem implements IFormItem{
    element: HTMLElement;
    validator: (el: HTMLElement, conf?: object) => boolean;
    type: string;
    confirm: object

    constructor({element, validator, type = 'input', confirm}:
                    { element: HTMLElement; validator(): boolean; type: string; confirm?: object}) {
        this.element = element
        this.validator = validator
        this.type = type
        this.confirm = confirm
    }

    validate () {
        if (this.type === 'password'){
            return this.validator(this.element, this.confirm)
        }
        else {
            return this.validator(this.element)
        }
    }

    get value() {
        return this.element
    }
}

export {FormItem, IFormItem};

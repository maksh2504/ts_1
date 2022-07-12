export type TValidator = (el: HTMLElement, conf?: object) => boolean;

interface IFormItem {
    element: HTMLInputElement;
    validator: TValidator;
    type: string;
    confirm: object;
    validate: () => boolean;
    value: string;
}

type TFomItemProps = {
    element: HTMLInputElement;
    validator: (el: HTMLElement, conf?: object) => boolean;
    type: string;
    confirm?: object
}

class FormItem implements IFormItem{
    element: HTMLInputElement;
    validator: (el: HTMLElement, conf?: object) => boolean;
    type: string;
    confirm: object

    constructor({element, validator, type = 'input', confirm}: TFomItemProps) {
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
        return this.element.value;
    }
}

export {FormItem, IFormItem};

import {FormItem, IFormItem} from "../FormItem/FormItem"

type TFormInstance = Record <string, IFormItem>

interface IForm {
    formInstance: TFormInstance;
    formElement: HTMLElement;
}

class Form implements IForm {
    formInstance: TFormInstance;
    formElement: HTMLElement;

    constructor(formElement: HTMLElement) {
        this.formInstance = {} as TFormInstance
        this.formElement = formElement

        this.formElement.addEventListener("submit", this._submit)
    }

    _printForm = () => {
        for(let field in this.formInstance) {
            console.log(field + ": " + this.formInstance[field].value); // .value
        }

    }

    _validate = () => {
        for(let field in this.formInstance) {
            if(!this.formInstance[field].validate()) return false
        }

        return true
    }

    _submit = (e : Event) => {
        e.preventDefault(); // Отключает стандартный обработчик

        if (this._validate()){
            this._printForm();
        }
    }

    addField (formInput: {type: string, label: string, name: string, validator: (a: HTMLInputElement) => boolean}) {
        const section = document.createElement('div');

        const inputLabel = document.createElement('label')
        inputLabel.innerHTML = formInput.label
        section.append(inputLabel)

        const element = document.createElement('input')
        element.id = formInput.name
        element.type = formInput.type
        element.required = true
        section.append(element)

        this.formElement.append(section)

        console.log(formInput.name)
        console.log(this.formInstance)

        this.formInstance[formInput.name] = new FormItem({
            element: element,
            validator: formInput.validator,
            type: formInput.type
        })
    }

    addButton(formButton: {type: string, label: string, name: string}) {
        // addButton(formButton: {type: string, label: string, name: string}) {

        const section = document.createElement('div');
        section.id = formButton.name;

        const button = document.createElement('button')
        button.type = formButton.type
        button.textContent = formButton.label
        section.append(button)

        this.formElement.append(section)
    }
}

export default Form


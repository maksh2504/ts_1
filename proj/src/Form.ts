import FormItem from "./Input"

type TFormInstance = {
    type: string;
    label: string;
    name: string;
    validator (el: HTMLInputElement): boolean;
}

interface IForm {
    formInstance: TFormInstance;
    formElement: HTMLElement;
}

class Form implements IForm {
    formInstance: TFormInstance;
    formElement: HTMLElement;

    constructor(formElement: HTMLElement) {
        // this.formInstance = {}
        this.formElement = formElement

        this.formElement.addEventListener("submit", this._submit)
    }

    _printForm = () => {
        for(let field in this.formInstance) {
            console.log(field + ": " + this.formInstance[field].element.value);
        }

    }

    _validate = () => {
        for(let field in this.formInstance) {
            if(!this.formInstance[field].validate()) return false
        }

        return true
    }

    _submit = (e : any) => {
        e.preventDefault(); // Отключает стандартный обработчик

        if (this._validate()){
            this._printForm();
        }
    }

    addField (formInput: {type: string, label: string, name: string, validator(): boolean}) {
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

        this.formInstance[formInput.name] = new FormItem({
            element: element,
            validator: formInput.validator,
            type: formInput.type
        })
    }

    addButton(formButton: {type: string, label: string, name: string}) {
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


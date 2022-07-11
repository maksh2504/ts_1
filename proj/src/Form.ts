import FormItem from "./Input"

type TFormInstance = {
    type: string;
    label: string;
    name: string;
    validator: any;
}

interface IForm {
    formInstance: TFormInstance;
    formElement: HTMLElement;
}

class Form implements IForm {
    formInstance: any;
    formElement: any;

    constructor(formElement: any) {
        this.formInstance = {}
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

    addField ({type, label, name, validator} : any) {
        const section = document.createElement('div');

        const inputLabel = document.createElement('label')
        inputLabel.innerHTML = label
        section.append(inputLabel)

        const element = document.createElement('input')
        element.id = name
        element.type = type
        element.required = true
        section.append(element)

        this.formElement.append(section)

        this.formInstance[name] = new FormItem({
            element,
            validator,
            type
        })
    }

    addButton({type, label, name} : any) {
        const section = document.createElement('div');
        section.id = name;

        const button = document.createElement('button')
        button.type = type
        button.textContent = label
        section.append(button)

        this.formElement.append(section)
    }
}

export default Form


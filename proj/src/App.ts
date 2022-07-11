import Form from "./Form"

const form1 = new Form (document.getElementById("form_id"))

form1.addField({
    type: 'input',
    label: 'First name:',
    name: 'firstName',
    validator: (name: HTMLInputElement) => name.value.length > 0 && name.value.length <= 8

})

form1.addField({
    type: 'input',
    label: 'Last name:',
    name: 'lastName',
    validator: (name: HTMLInputElement) => name.value.length > 0 && name.value.length <= 8
})

form1.addField({
    type: 'password',
    label: 'Password:',
    name: 'password',
    validator: (password: HTMLInputElement) => password.value
})

form1.addField({
    type: 'input',
    label: 'Email:',
    name: 'email',
    validator: (email: HTMLInputElement) => {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(email.value)) {
            return true;
        }
        else {
            console.log('Введите корректный e-mail');
            return false;
        }
    }
})

form1.addField({
    type: 'input',
    label: 'Phone:',
    name: 'phone',
    validator: (phone: HTMLInputElement) => {
        const reg = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
        if(reg.test(phone.value)) {
            return true;
        }
        else console.log('Введите корректный телефон');
        return false;
    }
})

form1.addButton({
    type: 'submit',
    label: 'Submit',
    name: 'submit'
})



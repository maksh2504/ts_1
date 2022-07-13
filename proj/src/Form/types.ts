import {IFormItem} from "../FormItem/FormItem";

export type TFormInstance = Record <string, IFormItem>

export type TAddField = {
    type: string;
    label: string;
    name: string;
    validator: (a: HTMLInputElement) => boolean;
}

export type TAddButton = {
    type: string;
    label: string;
    name: string;
}
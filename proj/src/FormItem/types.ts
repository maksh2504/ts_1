export type TFomItemProps = {
    element: HTMLInputElement;
    validator: (el: HTMLElement, conf?: object) => boolean;
    type: string;
    confirm?: object;
}

export type TValidator = (el: HTMLElement, conf?: object) => boolean;


// export {TFomItemProps, TValidator}
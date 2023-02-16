import React, {FC} from "react";
import cl from "./Input.module.css";
import {UIElementProps} from "../../../../types/UIElementTypes";

export enum InputViews {
    form = "form"
}

interface IInput extends React.InputHTMLAttributes<any> {
    view: InputViews;
    uiProps?: UIElementProps;
    label?: any;
    required?: boolean;
    name?: string;
    uiContainerProps?: UIElementProps
}

export const Input: FC<IInput> = (props: IInput) => {
    const inputClasses = [cl["input-container__input"]];
    const labelClasses = [cl["input-container__label"]];

    function getClassByView() {
        switch (props.view) {
            case InputViews.form:
                return cl["input_type_form"];
        }
    }

    inputClasses.push(getClassByView());

    if (props.required) {
        labelClasses.push(cl["input-container__label_required"]);
    }

    return (
        <div className={cl["input-container"]} style={props.uiContainerProps}>
            <div style={{position: "relative", width: "100%"}}>
                {
                    props.label &&
                    <label className={labelClasses.join(" ")}>{props.label} {props.required && <span>*</span>}</label>
                }
                <input
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    className={inputClasses.join(" ")}
                    style={props.uiProps}
                    required={props.required}
                    name={props.name}
                />
            </div>
        </div>
    );
};

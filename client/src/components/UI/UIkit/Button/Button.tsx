import React, { FC } from 'react';
import cl from "./Button.module.css";
import {UIElementProps} from "../../../../types/UIElementTypes";

export enum ButtonViews {
    default = "default",
    gray = "gray"
}

interface IButton extends React.ButtonHTMLAttributes<any>{
    view: ButtonViews;
    onClick?: () => void;
    uiProps?: UIElementProps;
    icon?: string;
    className?: string;
}

export const Button: FC<IButton> = (props: IButton) => {
    const buttonClasses = [cl["button"], props.className];

    function getClassByView() {
        switch (props.view) {
            case ButtonViews.default:
                return cl["button_type_default"];
            case ButtonViews.gray:
                return cl["button_type_gray"];
        }
    }

    buttonClasses.push(getClassByView());

    return (
        <button
            type={props.type}
            className={buttonClasses.join(" ")}
            onClick={props.onClick}
            style={props.uiProps}
            disabled={props.disabled}
        >
            {props.icon
                ? <img
                    src={props.icon}
                    alt="icon"
                    className={cl["button__icon"]}
                /> : ""}
            {props.children}
        </button>
    );
};

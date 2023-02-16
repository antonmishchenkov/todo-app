import React, { ComponentProps, FC, ReactNode } from "react";
import cl from "./FormContainer.module.css";
import { UIElementProps } from "../../../types/UIElementTypes";
import { formCallback } from "../../../types/callback";

interface IFormContainer extends ComponentProps<any> {
    uiProps?: UIElementProps;
    title?: {
        text: string;
        uiProps?: UIElementProps;
    };
    children?: ReactNode;
    onSubmit?: formCallback;
}

export const FormContainer: FC<IFormContainer> = (props: IFormContainer) => {
    return (
        <form
            className={cl["form-container"]}
            style={props.uiProps}
            onSubmit={props.onSubmit}
        >
            {props.title ? (
                <title
                    className={cl["form-container__title"]}
                    style={props.title.uiProps}
                >
                    {props.title.text}
                </title>
            ) : (
                ""
            )}
            {props.children}
        </form>
    );
};

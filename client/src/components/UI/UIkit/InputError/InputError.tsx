import React, {ComponentProps, FC} from 'react';
import cl from "./InputError.module.css";
import {UIElementProps} from "../../../../types/UIElementTypes";

interface IInputError extends ComponentProps<any> {
    uiProps?: UIElementProps;
}

const InputError: FC<IInputError> = (props) => {
    return (
        <span className={cl["error"]} style={props.uiProps}>
            {props.children}
        </span>
    );
};

export default InputError;
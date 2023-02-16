import React, { FC, ReactNode } from "react"
import { nothingReturnCallback } from "../../../../types/callback";
import { UIElementProps } from "../../../../types/UIElementTypes";
import cl from "./Checkbox.module.css"

interface ICheckbox {
    value: boolean,
    label: string | ReactNode | JSX.Element,
    uiProps?: UIElementProps,
    name?: string
    onChange: nothingReturnCallback<React.ChangeEvent<HTMLInputElement>>,
    labelStyles?: UIElementProps
}

const Checkbox:FC<ICheckbox> = ({value, label, onChange, uiProps, name, labelStyles}) => {
    return (
        <div className={cl["container"]} style={uiProps}>
            <input  type="checkbox" onChange={onChange} checked={value} name={name} className={cl["input"]}/>
            <label style={labelStyles} className={cl["label"]}>{label}</label>
        </div>
    )
}

export default Checkbox;
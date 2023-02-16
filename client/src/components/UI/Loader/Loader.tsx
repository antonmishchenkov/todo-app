import React, {FC} from "react"
import { UIElementProps } from "../../../types/UIElementTypes"
import cl from "./Loader.module.css"

interface ILoader extends React.ComponentProps<any> {
    loading: boolean;
    style?: UIElementProps;
}

const Loader: FC<ILoader> = (props) => {
    return (
        props.loading || !props.children
        ? <div className={cl["loader"]} style={props.style}>Loading...</div>
        : props.children
    )
}

export default Loader;
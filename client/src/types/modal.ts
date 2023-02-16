import React from "react";

export  interface IModal {
    isActive: boolean;
    toggle: (active: boolean) => void;
    children?: React.ReactNode;
    closeCallback?: () => void;
}
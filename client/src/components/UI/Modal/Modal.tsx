import React, {FC} from 'react';
import {IModal} from "../../../types/modal";
import cl from "./Modal.module.css";

export const Modal: FC<IModal> = ({isActive, toggle, children, closeCallback}) => {
    const modalClasses = [cl["modal"]];

    const closeModal = () => {
        toggle(false);

        if (closeCallback) {
            closeCallback();
        }
    }

    if (isActive) {
        modalClasses.push(cl["modal_active"]);
    }

    const closeModalByOverlay = (e: any) => {
        if (e.target.classList.contains(cl["modal"])) {
            closeModal()
        }
    }

    return (
        <div className={modalClasses.join(' ')} onMouseDown={closeModalByOverlay}>
            <div className={cl["modal-wrap"]}>
                {children}
            </div>
        </div>
    )
};

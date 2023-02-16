import React, {FC, useContext} from 'react';
import cl from "./TaskListItem.module.css";
import {ITask, ITaskListItem} from "../../../../types/tasks";
import deleteIcon from "../../../../vendor/images/icons/delete-white.svg";
import TasksService from "../../../../services/TasksService";
import {Context} from "../../../../App";

const TaskListItem: FC<ITaskListItem> = (
    {
        id,
        name,
        email,
        status,
        text,
        wasUpdated,
        setTasks,
        setTaskOpened,
        setUpdatingTask,
        uiProps
    }
) => {
    const { store } = useContext(Context);

    const deleteTask = (evt: any) => {
        evt.stopPropagation();
        TasksService.deleteTask(id)
            .then(() => {
                setTasks((prev: ITask[]) => prev.filter(task => task.id !== id));
            })
            .catch((e) => console.log(e))
    }

    const openTask = () => {
        if (store.user.roleId === "admin") {
            setUpdatingTask({
                id: id,
                name: name,
                email: email,
                status: status,
                text: text,
                wasUpdated: wasUpdated
            })
            setTaskOpened(true);
        }
    }

    return (
        <div className={cl["task-item"]} style={uiProps} onClick={openTask}>
            <div className={cl["task-item__header"]}>
                <span className={cl["task-item__title"]}>{name}</span>
                {
                    store.user.roleId === "admin" &&
                    <img className={cl["task-item__delete"]} src={deleteIcon} alt="delete" onClick={deleteTask}/>
                }
            </div>
            <div className={cl["task-item__info"]}>
                <span className={cl["task-item__label"]}>Email: </span>
                <span className={cl["task-item__value"]}>{email}</span>
                <span className={cl["task-item__label"]}>Status</span>
                <span className={cl["task-item__value"]}>{status}</span>
                {wasUpdated && <span className={cl["task-item__label"]}>Отредактирована администратором</span>}
            </div>
            <div className={cl["task-item__text"]}>
                <span className={cl["task-item__label"]}>Text</span>
                <span className={cl["task-item__text-value"]}>{text}</span>
            </div>
        </div>
    );
};

export default TaskListItem;
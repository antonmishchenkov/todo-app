import {UIElementProps} from "./UIElementTypes";

export interface ITask {
    id: number;
    name: string;
    email: string;
    status: string;
    text: string;
    wasUpdated: boolean;
}

export interface ITaskList {
    tasks: ITask[];
    setTasks: Function;
    setTaskOpened: Function;
    setUpdatingTask: Function;
}

export interface ITaskListItem extends ITask {
    setTasks: Function;
    setTaskOpened: Function;
    setUpdatingTask: Function;
    uiProps?: UIElementProps;
}
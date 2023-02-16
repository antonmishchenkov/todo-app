import React, {FC} from 'react';
import cl from "./TaskList.module.css";
import TaskListItem from "../TaskListItem/TaskListItem";
import {ITaskList} from "../../../../types/tasks";

const TaskList: FC<ITaskList> = ({tasks, setTasks, setTaskOpened, setUpdatingTask}) => {
    const renderTasks = () => {
        return tasks.map(task => {
            return (
                <TaskListItem
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    email={task.email}
                    status={task.status}
                    text={task.text}
                    wasUpdated={task.wasUpdated}
                    setTasks={setTasks}
                    setTaskOpened={setTaskOpened}
                    setUpdatingTask={setUpdatingTask}
                    uiProps={{marginBottom: "15px"}}
                />
            )
        })
    }

    return (
        <div className={cl["container"]}>
            {renderTasks()}
        </div>
    );
};

export default TaskList;
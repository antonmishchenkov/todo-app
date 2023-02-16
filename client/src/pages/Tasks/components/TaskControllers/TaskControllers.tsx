import React, {FC, useState} from 'react';
import cl from "./TaskControllers.module.css";
import {Button, ButtonViews} from "../../../../components/UI/UIkit/Button/Button";
import {ITask} from "../../../../types/tasks";
import arrowDownIcon from "../../../../vendor/images/icons/arrow-down.svg";
import arrowUpIcon from "../../../../vendor/images/icons/arrow-up.svg";

const TaskControllers: FC<React.ComponentProps<any>> = ({tasks, setTasks, setUpdatingTask, setTaskOpened}) => {
    const [descName, setDescName] = useState<boolean | null>(null);
    const [descEmail, setDescEmail] = useState<boolean | null>(null);
    const [descText, setDescText] = useState<boolean | null>(null);

    const sortTasksByParam = (param: keyof ITask, desc: boolean = false) => {
        return [...tasks].sort((a: ITask, b: ITask) => {
            // @ts-ignore
            return desc ? a[param].localeCompare(b[param]) : b[param].localeCompare(a[param])
        })
    }

    const setIcon = (desc: boolean | null, iconDesc: string, iconAsc: string) => {
        return desc === null ? "" : (desc ? iconDesc : iconAsc)
    }

    return (
        <div className={cl["controllers"]}>
            <div className={cl["controllers__sorting"]}>
                <span className={cl["controllers__label"]}>Сортировать по: </span>
                <Button
                    view={ButtonViews.default}
                    uiProps={{marginRight: "5px", padding: "5px 8px", fontFamily: "InterLight"}}
                    icon={setIcon(descName, arrowDownIcon, arrowUpIcon)}
                    onClick={() => {
                        setDescEmail(null);
                        setDescText(null);
                        setDescName(!descName)
                        setTasks(sortTasksByParam("name", !descName))
                    }}
                >
                    Названию
                </Button>
                <Button
                    view={ButtonViews.default}
                    uiProps={{marginRight: "5px", padding: "5px 8px", fontFamily: "InterLight"}}
                    icon={setIcon(descEmail, arrowDownIcon, arrowUpIcon)}
                    onClick={() => {
                        setDescName(null);
                        setDescText(null);
                        setDescEmail(!descEmail)
                        setTasks(sortTasksByParam("email", !descEmail))
                    }}
                >
                    Пользователю
                </Button>
                <Button
                    view={ButtonViews.default}
                    uiProps={{marginRight: "5px", padding: "5px 8px", fontFamily: "InterLight"}}
                    icon={setIcon(descText, arrowDownIcon, arrowUpIcon)}
                    onClick={() => {
                        setDescName(null);
                        setDescEmail(null);
                        setDescText(!descText)
                        setTasks(sortTasksByParam("text", !descText))
                    }}
                >
                    Тексту
                </Button>
            </div>
            <Button
                view={ButtonViews.default}
                onClick={() => {
                    setUpdatingTask(null);
                    setTaskOpened(true)
                }}
            >
                Создать задачу
            </Button>
        </div>
    );
};

export default TaskControllers;
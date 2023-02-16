import React, {FC, FormEvent, useContext, useEffect, useState} from 'react';
import {Input, InputViews} from "../../UI/UIkit/Input/Input";
import {Button, ButtonViews} from "../../UI/UIkit/Button/Button";
import {FormContainer} from "../../UI/FormContainer/FormContainer";
import Loader from "../../UI/Loader/Loader";
import {Context} from "../../../App";
import InputError from "../../UI/UIkit/InputError/InputError";
import TasksService from "../../../services/TasksService";
import {ITask} from "../../../types/tasks";
import Checkbox from "../../UI/UIkit/Checkbox/Checkbox";
import {regularEmail} from "../../../constants/regulars";

interface ITaskForm {
    setTasks: Function;
    setTaskOpened: Function;
    isUpdating?: boolean;
    initialState?: ITask | null;
}

interface ITaskFormData {
    name: string;
    email: string;
    text: string;
}

const TaskForm: FC<ITaskForm> = ({initialState, setTasks, setTaskOpened}) => {
    const [formData, setFormData] = useState<ITask>({ id: 0, name: "", email: "", text: "", status: "in-progress", wasUpdated: false});
    const [inputErrors, setInputErrors] = useState<ITaskFormData>({ name: "", email: "", text: "" });
    const [loading, setLoading] = useState(false);
    const { store } = useContext(Context);

    const validate = (field: string, value: string, type: string = "text") => {
        if ((type === "text" || type === "email") && value.length === 0) {
            setInputErrors({...inputErrors, [field]: "Поле не должно быть пустым"});
            return false;
        }
        if (type === "email" && !regularEmail.test(value)) {
            setInputErrors({...inputErrors, [field]: "Введите корректный email"});
            return false;
        }

        setInputErrors({...inputErrors, [field]: ""});
        return true;
    }

    const submitForm = (evt: FormEvent) => {
        evt.preventDefault();
        let isValid = validate("name", formData.name);
        isValid = isValid && validate("email", formData.email, "email");
        isValid = isValid && validate("text", formData.text);

        if (!isValid) { return; }

        setLoading(true);

        !initialState &&
        TasksService.createTask(formData.name, formData.email, formData.text)
            .then((res) => {
                setTasks((prev: ITask[]) => [...prev, res.data]);
                setTaskOpened(false);
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))

        initialState &&
        TasksService.updateTask(initialState.id, {...formData, wasUpdated: true})
            .then((res) => {
                setTasks((prev: ITask[]) => [res.data, ...prev.filter(task => task.id !== initialState.id)]);
                setTaskOpened(false);
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (initialState) {
            setFormData(initialState)
        } else {
            setFormData({
                id: 0,
                name: "",
                email: "",
                text: "",
                status: "in-progress",
                wasUpdated: false
            })
            setInputErrors({ name: "", email: "", text: "" })
        }
    }, [initialState]);

    return (
        <FormContainer
            uiProps={{width: "300px"}}
            title={{
                text: "Новая задача"
            }}
            onSubmit={submitForm}
        >
            <Input
                value={formData.name}
                onChange={(evt) => setFormData({...formData, name: evt.target.value})}
                view={InputViews.form}
                label="Название"
                placeholder="Введите название"
                uiContainerProps={{margin: "20px 0 0 0"}}
            />
            <InputError uiProps={{margin: "0 0 5px 0" }}>
                {inputErrors.name}
            </InputError>
            <Input
                type="text"
                value={formData.email}
                onChange={(evt) => setFormData({...formData, email: evt.target.value})}
                view={InputViews.form}
                label="Email"
                placeholder="Введите Email"
                uiContainerProps={{margin: "20px 0 0 0"}}
            />
            <InputError uiProps={{margin: "0 0 5px 0" }}>
                {inputErrors.email}
            </InputError>
            <Input
                value={formData.text}
                onChange={(evt) => setFormData({...formData, text: evt.target.value})}
                view={InputViews.form}
                label="Text"
                placeholder="Введите текст задачи"
                uiContainerProps={{margin: "20px 0 0 0"}}
            />
            <InputError uiProps={{margin: "0 0 5px 0" }}>
                {inputErrors.text}
            </InputError>
            {
                initialState &&
                <Checkbox
                    value={formData.status === "done"}
                    label="Выполнена"
                    uiProps={{marginTop: "20px"}}
                    onChange={(evt) => setFormData({...formData, status: evt.target.checked ? "done" : "in-progress"})}
                />
            }
            <Button
                view={ButtonViews.default}
                type="submit"
                uiProps={{margin: "20px 0 0 0"}}
            >
                <Loader loading={loading} style={{fontSize: "2px"}}>
                    {initialState ? "Обновить" : "Создать"}
                </Loader>
            </Button>
        </FormContainer>
    );
};

export default TaskForm;
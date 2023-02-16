import React, {FC, FormEvent, useContext, useState} from 'react';
import {Input, InputViews} from "../../UI/UIkit/Input/Input";
import {Button, ButtonViews} from "../../UI/UIkit/Button/Button";
import {FormContainer} from "../../UI/FormContainer/FormContainer";
import Loader from "../../UI/Loader/Loader";
import {Context} from "../../../App";
import InputError from "../../UI/UIkit/InputError/InputError";

const LoginForm: FC<React.ComponentProps<any>> = ({setLoginOpened}) => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [inputErrors, setInputErrors] = useState({ login: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { store } = useContext(Context);

    const submitForm = (evt: FormEvent) => {
        evt.preventDefault();
        setLoading(true);

        store.login(login, password)
            .then((res) => {
                if (res.status === 200) {
                    setLoginOpened(false);
                }
                if (res.status === 400) {
                    res.data.errors.forEach((err: any) => {
                        if (err.errCode === "400-1") {
                            setInputErrors({ login: res.data.message, password: "" })
                        }
                        if (err.errCode === "400-2") {
                            setInputErrors({ login: "", password: res.data.message })
                        }
                    })
                }
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }

    return (
        <FormContainer
            uiProps={{width: "300px"}}
            title={{
                text: "Авторизация"
            }}
            onSubmit={submitForm}
        >
            <Input
                value={login}
                onChange={(evt) => setLogin(evt.target.value)}
                view={InputViews.form}
                label="Email или логин"
                placeholder="Введите email или логин"
                required={true}
                uiContainerProps={{margin: "20px 0 0 0"}}
            />
            <InputError uiProps={{margin: "0 0 5px 0" }}>
                {inputErrors.login}
            </InputError>
            <Input
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                view={InputViews.form}
                label="Пароль"
                placeholder="Введите пароль"
                required={true}
                uiContainerProps={{margin: "20px 0 0 0"}}
            />
            <InputError uiProps={{margin: "0 0 5px 0" }}>
                {inputErrors.password}
            </InputError>
            <Button
                view={ButtonViews.default}
                type="submit"
                uiProps={{margin: "20px 0 0 0"}}
            >
                <Loader loading={loading} style={{fontSize: "2px"}}>Авторизоваться</Loader>
            </Button>
        </FormContainer>
    );
};

export default LoginForm;
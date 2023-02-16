import React, {useContext, useEffect, useState} from "react";
import { Context } from "../App";
import { observer } from "mobx-react-lite";
import Header from "./UI/Header/Header";
import Loader from "./UI/Loader/Loader";
import Tasks from "../pages/Tasks/Tasks";
import {Modal} from "./UI/Modal/Modal";
import LoginForm from "./functional/LoginForm/LoginForm";

const AppRouter = () => {
    const {store} = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [isLoginOpened, setLoginOpened] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem('token')) {
            store.checkAuth()
                .then(() => {})
                .catch(e => {/*console.log(e)*/})
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }

    }, [store.isAuth]);

    return (
        <>
            <Header setLoginOpened={setLoginOpened}/>
            <Loader loading={loading} style={{width: '50px', height: '50px', fontSize: '5px', margin: "250px auto", overflow: "hidden"}}>
                <Tasks/>
            </Loader>

            <Modal isActive={isLoginOpened} toggle={setLoginOpened}>
                <LoginForm setLoginOpened={setLoginOpened}/>
            </Modal>
        </>
    );
};

export default observer(AppRouter);

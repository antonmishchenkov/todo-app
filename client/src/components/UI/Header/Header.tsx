import React, {FC, useContext} from 'react';
import cl from "./Header.module.css";
import {Context} from "../../../App";
import {Button, ButtonViews} from "../UIkit/Button/Button";
import {observer} from "mobx-react-lite";

interface IHeader extends React.ComponentProps<any> {
    setLoginOpened: Function;
}

const Header: FC<IHeader> = observer(({setLoginOpened}) => {
    const { store } = useContext(Context);

    const getControllersLayout = () => {
        if (store.isAuth) {
            return (
                <>
                    <span className={cl["header__signed"]}>signed in as: </span>
                    <span className={cl["header__username"]}>{store.user.username}</span>
                    <Button
                        view={ButtonViews.default}
                        onClick={() => store.logout()}
                    >
                        Выйти
                    </Button>
                </>
            )
        } else {
            return (
                <Button
                    view={ButtonViews.default}
                    onClick={() => setLoginOpened(true)}
                >
                    Войти
                </Button>
            )
        }
    }

    return (
        <div className={cl["header"]}>
            <div className={cl["header__logo"]}>ToDo App</div>
            <div className={cl["header__controllers"]}>
                {getControllersLayout()}
            </div>
        </div>
    );
});

export default Header;
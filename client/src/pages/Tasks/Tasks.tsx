import React, {useEffect, useState} from 'react';
import cl from "./Tasks.module.css";
import {ITask} from "../../types/tasks";
import TasksService from "../../services/TasksService";
import Loader from "../../components/UI/Loader/Loader";
import TaskList from "./components/TaskList/TaskList";
import {Modal} from "../../components/UI/Modal/Modal";
import TaskForm from "../../components/functional/TaskForm/TaskForm";
import TaskControllers from "./components/TaskControllers/TaskControllers";
import Pagination from "../../components/UI/Pagination/Pagination";

const Tasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
    const [isTaskOpened, setTaskOpened] = useState(false);
    const [updatingTask, setUpdatingTask] = useState<ITask | null>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const LIMIT = 3;

    const getTasks = async () => {
        const initialTasks = await TasksService.getAllTasks();
        setTasks(initialTasks.data);
        setFilteredTasks(initialTasks.data);
        setTotalPages(Math.ceil(initialTasks.data.length / LIMIT))
    }

    useEffect(() => {
        setLoading(true);
        getTasks().catch((e) => console.log(e)).finally(() => setLoading(false))
    }, []);

    useEffect(() => {
        setFilteredTasks(tasks.filter((task, i) => (i + 1 > page*LIMIT - LIMIT) && (i + 1 <= page*LIMIT)));
        setTotalPages(Math.ceil(tasks.length / LIMIT))
    }, [tasks, page])

    return (
        <div className={cl["page"]}>
            <div className={cl["page__content"]}>
                <TaskControllers tasks={tasks} setTasks={setTasks} setTaskOpened={setTaskOpened} setUpdatingTask={setUpdatingTask}/>
                <Loader loading={loading} style={{width: '50px', height: '50px', fontSize: '5px', margin: "50px auto", overflow: "hidden"}}>
                    <TaskList tasks={filteredTasks} setTasks={setTasks} setTaskOpened={setTaskOpened} setUpdatingTask={setUpdatingTask}/>
                </Loader>
                {tasks.length > LIMIT && <Pagination totalPages={totalPages} page={page} changePage={setPage}/>}
            </div>

            <Modal isActive={isTaskOpened} toggle={setTaskOpened}>
                <TaskForm
                    setTasks={setTasks}
                    setTaskOpened={setTaskOpened}
                    initialState={updatingTask ? updatingTask : null}
                />
            </Modal>
        </div>
    );
};

export default Tasks;
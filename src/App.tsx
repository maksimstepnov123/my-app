import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import nextId from "react-id-generator";
import { TaskType } from './components/Task/Task';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Modal } from "antd";

export type filterTaskType = "all" | "active" | "completed"

function App() {

    type TodoListType = {
        name: string,
        id: string,
        tasks: string,
        filter: filterTaskType
    }

    const initialLists: TodoListType[] = [
        {
            name: "учёба",
            id: nextId(),
            tasks: nextId(),
            filter: "all"
        },
        {
            name: "работа",
            id: nextId(),
            tasks: nextId(),
            filter: "active"

        }
    ]


    const [todoLists, setTodoLists] = useState(initialLists)

    const initialData = [
        {
            id: nextId(),
            name: "typescript",
            status: true
        },
        {
            id: nextId(),
            name: "Задача 2",
            status: false
        },
        {
            id: nextId(),
            name: "Задача 3",
            status: true
        }
    ]

    const initialData2 = [
        {
            id: nextId(),
            name: "AAAAAAAAAAAAAAAAAAAAAA",
            status: true
        },
        {
            id: nextId(),
            name: "Задача 10",
            status: false
        },
        {
            id: nextId(),
            name: "asfdgfhgjhkj",
            status: true
        }
    ]

    let initialTasks = {
        [todoLists[0].tasks]: initialData,
        [todoLists[1].tasks]: initialData2,
    }

    const [tasks, setTasks] = useState(initialTasks)



    // let [data, setData] = useState<Array<TaskType>>(initialData)
    // let [filterTasks, setFilterTasks] = useState<filterTaskType>("all")
    function setFilterTasks(filter: filterTaskType, todoListId: string) {
        let newTodoLists = [...todoLists]

        newTodoLists = newTodoLists.map(e => {
            if (e.id === todoListId) {
                e.filter = filter
            }
            return e
        })
        setTodoLists(newTodoLists)
    }

    function changeStatus(id: string, todoListId: string) {
        let newTasks = { ...tasks }
        newTasks[todoListId].map(
            e => {
                if (e.id === id) {
                    e.status = !e.status
                }
                return e
            })
        setTasks(newTasks)
    }

    function addTask(text: string, todoListId: string) {
        text = text.trim()

        if (text !== "") {
            let newTasks = { ...tasks }

            newTasks[todoListId] = [...newTasks[todoListId], { id: nextId(), name: text, status: true }]

            setTasks(newTasks)
        }
    }

    function deleteTask(id: string, todoListId: string) {
        let newTasks = { ...tasks }

        newTasks[todoListId] = newTasks[todoListId].filter(e => e.id !== id)
        setTasks(newTasks)
    }



    function setTodoListName(name: string, id: string) {
        let newTodoLists = [...todoLists]

        newTodoLists = newTodoLists.map(e => {
            if (e.id === id) {
                e.name = name
            }
            return e
        })
        setTodoLists(newTodoLists)
    }

    function setTaskTitle(taskName: string, tasksId: string, taskId: string) {
        let newTasks = { ...tasks }

        newTasks[tasksId] = newTasks[tasksId].map(e => {
            if (e.id === taskId) {
                e.name = taskName
            }
            return e
        })
        setTasks(newTasks)
    }




    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        let newTodoList: TodoListType =
        {
            name: newTodoListName,
            id: nextId(),
            tasks: nextId(),
            filter: "all"
        }
        tasks[newTodoList.tasks] = []
        setTasks(tasks)
        setNewTodoListName("")
        setTodoLists([...todoLists, newTodoList])
        setOpen(false);

    };

    const handleCancel = () => {
        setOpen(false);
    };


    const [newTodoListName, setNewTodoListName] = useState<string>("")

    return (
        <div className="App">
            <h1>todo list</h1>
            <div className="app-body">
                <div className="todoLists">
                    {todoLists.map(e => {
                        let filterTasksNew = tasks[e.tasks]

                        if (e.filter === "active") {
                            filterTasksNew = tasks[e.tasks].filter(i => !i.status)
                        }
                        if (e.filter === "completed") {
                            filterTasksNew = tasks[e.tasks].filter(i => i.status)
                        }
                        return (
                            <TodoList tasksId={e.tasks} id={e.id} key={e.id} name={e.name} setTodoListName={setTodoListName} tasks={filterTasksNew} deleteTask={deleteTask} setFilterTasks={setFilterTasks} changeStatus={changeStatus} addTask={addTask} filterValue={e.filter} setTaskTitle={setTaskTitle} />
                        )
                    })}
                    <div className="addList-wrapper">
                        <Button type='primary' className="addList" onClick={showModal}><PlusCircleOutlined className='addList_plus' /></Button>

                        <Modal
                            open={open}
                            title="Title"
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                    Return
                                </Button>,
                                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                    Submit
                                </Button>,
                            ]}
                        >
                            <h4>Добавить Todo List</h4>
                            <input type="text" onChange={(e) => setNewTodoListName(e.currentTarget.value)} value={newTodoListName} />
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
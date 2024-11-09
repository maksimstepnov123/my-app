import React, { FC, useState } from "react"
import "./Task.css"
import { Switch } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export type TaskType = {
    id: string;
    name: string;
    status: boolean;
}
type TaskPropsType = {
    id: string;
    data: TaskType;
    deleteTask: (id: string, todoListId: string) => void;
    changeStatus: (id: string, todoListId: string) => void;
    todoListId: string;
    setTaskTitle: (taskName: string, tasksId: string, taskId: string) => void
}


export function Task({ id, data, deleteTask, changeStatus, todoListId, setTaskTitle }: TaskPropsType) {
    let [editTaskTitle, setEditTaskTitle] = useState<boolean>(false)
    let [taskName, setTaskName] = useState<string>(data.name)

    function closeEditTaskName() {
        if (taskName == "") {
            setEditTaskTitle(true)
        }
        else {
            setEditTaskTitle(false)
            setTaskTitle(taskName, todoListId, id)
        }
    }

    return (
        <li className="todo-list__task">
            <Switch checked={data.status} onChange={() => { changeStatus(data.id, todoListId) }} />
            {
                editTaskTitle ?
                    <input value={taskName} type="text" className="todo-change-name" onBlur={closeEditTaskName} onChange={(e) => setTaskName(e.currentTarget.value)} /> :
                    <span className="todo-list__task-name" onClick={() => setEditTaskTitle(true)}>{taskName}</span>
            }
            <CloseOutlined onClick={() => deleteTask(data.id, todoListId)} />
        </li>
    )
}
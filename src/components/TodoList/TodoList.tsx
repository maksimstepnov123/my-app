import { useState } from "react";
import { Task, TaskType } from "../Task/Task";
import "./TodoList.css"
import { filterTaskType } from "../../App";
import { Button, Flex, ConfigProvider, Input } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        border-width: 0;
  
        > span {
          position: relative;
        }
  
        &::before {
          content: '';
          background: linear-gradient(135deg, #6253e1, #04befe);
          position: absolute;
          inset: 0;
          opacity: 1;
          transition: all 0.3s;
          border-radius: inherit;
        }
  
        &:hover::before {
          opacity: 0;
        }
      }
    `,
}));


type TodoListProps = {
    tasksId: string;
    id: string;
    name: string;
    tasks: Array<TaskType>;
    deleteTask: (id: string, todoListId: string) => void;
    setFilterTasks: (filter: filterTaskType, todoListId: string) => void;
    changeStatus: (id: string, todoListId: string) => void;
    addTask: (text: string, todoListId: string) => void;
    filterValue: filterTaskType;
    setTodoListName: (name: string, id: string) => void;
    setTaskTitle: (taskName: string, tasksId: string, taskId: string) => void
}
function TodoList({ tasksId, id, name, setTodoListName, tasks, deleteTask, setFilterTasks, changeStatus, addTask, filterValue, setTaskTitle }: TodoListProps) {
    function addNewTask(taskText: string) {
        addTask(taskText, tasksId)
        setTaskText("")
    }
    let [taskText, setTaskText] = useState<string>("")

    const { styles } = useStyle();

    let [editTitle, setEditTitle] = useState<boolean>(false)

    function closeEditTodoName() {
        if (name == "") {
            setEditTitle(true)
        }
        else {
            setEditTitle(false)
        }
    }
    return (
        <div className="todo-list">
            <div className="todo-list__header">

                {!editTitle && <h2 className="todo-list__title" onClick={() => setEditTitle(true)} >{name}</h2>}
                {editTitle && <Input maxLength={20} size="large" className="todo-list__title-changer" type="text"
                    value={name} onChange={(e) => setTodoListName(e.currentTarget.value, id)} onBlur={closeEditTodoName} />}

                <hr></hr>

                <div>
                    <Input maxLength={150} variant="filled" size="large" value={taskText} className="todo-list__input" onChange={(e) => setTaskText(e.currentTarget.value)} />
                    <ConfigProvider
                        button={{
                            className: styles.linearGradientButton,
                        }}
                    >
                        <Button onClick={() => { addNewTask(taskText) }} type="primary" size="large">Добавить</Button>
                    </ConfigProvider>
                </div>


            </div>
            <ul className="todo-list__content">
                {tasks.map(e => <Task data={{
                    id: e.id,
                    name: e.name,
                    status: e.status
                }} key={e.id} id={e.id} deleteTask={deleteTask} changeStatus={changeStatus} todoListId={tasksId} setTaskTitle={setTaskTitle} />)}
            </ul>
            <div className="todo-list__footer">
                <Button type={filterValue === "all" ? "primary" : "default"} className="todo-list__button" onClick={() => { setFilterTasks("all", id) }}>All</Button>
                <Button type={filterValue === "active" ? "primary" : "default"} className="todo-list__button" onClick={() => { setFilterTasks("active", id) }}>Active</Button>
                <Button type={filterValue === "completed" ? "primary" : "default"} className="todo-list__button" onClick={() => { setFilterTasks("completed", id) }}>Completed</Button>
            </div>
        </div>
    )
}
export default TodoList
import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"

type TaskItemProps = {
    id: string,
    title: string,
    done: boolean,
    deleteTask: (id: string) => void,
    changeTask: (id: string) => void,

}

function TaskItem({ id, title, done, deleteTask, changeTask }: TaskItemProps) {
    const { theme } = useContext(ThemeContext)

    const deleteHandle = (event: any) => {
        event.stopPropagation()
        deleteTask(id)
    }

    const chandgeHandle = () => {
        changeTask(id)
    }

    return (
        <div onClick={chandgeHandle} className={`todo-item todo-item-${theme}`} style={{backgroundColor: done ? 'green' : 'red' }}>
            <h3>{title}</h3>
            <button onClick={deleteHandle}>X</button>
        </div>
    )
}


export default TaskItem

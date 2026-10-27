import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"

type TaskItemProps = {
    id: number,
    title: string,
    completed: boolean,
    deleteTask: (id: number) => void,
    changeTask: (id: number) => void,

}

function TaskItem({ id, title, completed, deleteTask, changeTask }: TaskItemProps) {
    const { theme } = useContext(ThemeContext)

    const deleteHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        deleteTask(id)
    }

    const chandgeHandle = () => {
        changeTask(id)
    }

    return (
        <div
            onClick={chandgeHandle}
            className={`todo-item todo-item-${theme}`}
            style={{ backgroundColor: completed ? 'green' : 'red' }}
        >
            <h3>{title}</h3>
            <button onClick={deleteHandle}>X</button>
        </div>
    )
}


export default TaskItem

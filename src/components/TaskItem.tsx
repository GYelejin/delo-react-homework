import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"

type TaskItemProps = {
    id: string,
    title: string,
    done: boolean
}

function TaskItem({id, title, done}:TaskItemProps){
    const { theme } = useContext(ThemeContext)

    return (
        <div className={`todo-item todo-item-${theme}`}>
            <h3>{title}</h3>
            <p>{done+''}</p>
        </div>
    )
}


export default TaskItem

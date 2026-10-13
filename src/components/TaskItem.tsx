type TaskItemProps = {
    id: string,
    title: string,
    done: boolean
}

function TaskItem({id, title, done}:TaskItemProps){
    return (
        <div className="todo-item">
            <h3>{title}</h3>
            <p>{done+''}</p>
        </div>
    )
}


export default TaskItem
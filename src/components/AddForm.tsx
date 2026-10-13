import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

type AddFormProps = {
    addTask: (title: string) => void
}

function AddForm({ addTask }: AddFormProps) {

    const { theme } = useContext(ThemeContext)
    return (
        <div className={`add-form theme-${theme}`}>
            <input
                id="task-title"
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        addTask(event.currentTarget.value);
                        event.currentTarget.value = '';
                    }
                }}
                placeholder="Например, изучить JSX"
            />
        </div>
    )
}

export default AddForm
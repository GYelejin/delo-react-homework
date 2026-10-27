import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

type AddFormProps = {
    addTask: (title: string) => void
}

function AddForm({ addTask }: AddFormProps) {
    const context = useContext(ThemeContext);
    const theme = context?.theme ?? 'light';

    return (
        <div className={`add-form add-form-${theme}`}>
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

export default AddForm;

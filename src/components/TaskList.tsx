import { useContext } from 'react';
import type { Task } from './App';
import TaskItem from './TaskItem';
import { ThemeContext } from '../context/themeContext';

type TaskListProps = {
  tasks: Task[];
};

function TaskList({ tasks }: TaskListProps) {
  const context = useContext(ThemeContext);
  const theme = context?.theme ?? 'light';

  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
        Список задач пуст
      </div>
    );
  }

  return (
    <div className={`todo-list todo-list-${theme}`}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
        />
      ))}
    </div>
  );
}

export default TaskList;

import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

type TaskItemProps = {
  id: number;
  title: string;
  completed: boolean;
};

function TaskItem({ id, title, completed }: TaskItemProps) {
  const context = useContext(ThemeContext);

  if (!context) {
    return null;
  }

  const { theme, deleteTask, changeTask } = context;

  const deleteHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteTask(id);
  };

  const changeHandle = () => {
    changeTask(id);
  };

  return (
    <div
      onClick={changeHandle}
      className={`todo-item todo-item-${theme}`}
      style={{
        backgroundColor: completed ? '#2ecc71' : '#e74c3c',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        margin: '8px 0',
        borderRadius: '8px',
        transition: 'background-color 0.2s ease',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>{title}</h3>
      <button
        onClick={deleteHandle}
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: 'none',
          color: '#ffffff',
          borderRadius: '4px',
          width: '28px',
          height: '28px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        X
      </button>
    </div>
  );
}

export default TaskItem;

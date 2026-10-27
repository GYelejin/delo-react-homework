import { useState, useEffect } from 'react';
import Header from './Header';
import '../index.css';
import TaskList from './TaskList';
import AddForm from './AddForm';
import { ThemeContext, type ThemeType } from '../context/themeContext';
import { fetchTodos, type ApiTodo } from '../api/todos.api';

export type Task = ApiTodo;

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<ThemeType>('light');
  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle');

  // Добавление задачи
  const addTask = (title: string) => {
    if (!title.trim()) return;
    const newTask: Task = {
      userId: 1,
      id: Date.now(), // Используем Date.now() по ТЗ как уникальный ID
      title: title.trim(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Удаление задачи
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Смена статуса задачи (completed / done)
  const changeTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Загрузка данных из API
  const loadNetworkData = async () => {
    setApiStatus('loading');
    try {
      const data = await fetchTodos();
      setTasks(data);
      setApiStatus('success');
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
      setApiStatus('error');
    }
  };

  // 2-уровень: Алгоритм работы с localStorage и useEffect
  // Если локальное хранилище пустое — выполняем сетевой запрос к API
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed);
          setApiStatus('success');
          return;
        }
      } catch (e) {
        console.error('Ошибка парсинга localStorage:', e);
      }
    }
    // Если состояние пустое в localStorage — выполняем сетевой запрос
    loadNetworkData();
  }, []);

  // Синхронизация tasks в localStorage
  useEffect(() => {
    if (tasks.length > 0 || apiStatus === 'success') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, apiStatus]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, deleteTask, changeTask }}>
      <div className={`app-container app-${theme}`}>
        <Header />
        <AddForm addTask={addTask} />

        {/* Индикатор статуса сетевого запроса по ТЗ */}
        {apiStatus === 'loading' && (
          <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px', color: '#3498db' }}>
            ⏳ Загрузка задач из сети...
          </div>
        )}

        {apiStatus === 'error' && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#e74c3c' }}>
            ❌ Произошла ошибка при загрузке задач.{' '}
            <button
              onClick={loadNetworkData}
              style={{
                marginLeft: '10px',
                padding: '6px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              Повторить
            </button>
          </div>
        )}

        {/* Основной список задач */}
        <TaskList tasks={tasks} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

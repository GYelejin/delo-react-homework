import {useState } from 'react'
import Header from './Header'
import '../index.css'
import TaskList from './TaskList';
import AddForm from './AddForm';
import { ThemeContext } from '../context/themeContext';


export type Task = {
  id: string;
  title: string;
  done: boolean;
};

const defaultTasks: Task[] = [
  { id: '1', title: 'Title 1', done: true },
  { id: '2', title: 'Title 2', done: false },
  { id: '3', title: 'Title 3', done: true },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  // Состояние для переключение контеста
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      done: false
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id: string) => {
    const changedTasks = tasks.filter((task) => task.id !== id)
    setTasks(changedTasks)
  }

  const changeTask = (id: string) => {
    const changedTasks = tasks.map((task) => {
      if (task.id === id){
        task.done = !task.done
      }
      return task
    })
    setTasks(changedTasks)

  }

  return (
    <>
      {/* Provider - "облако", в которое мы помещаем состояние и сетСтейт для дочерних компонентов  */}
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Header />
        <AddForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} changeTask={changeTask}/>
      </ThemeContext.Provider>
    </>
  );
}


export default App

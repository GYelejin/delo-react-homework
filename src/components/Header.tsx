import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"

function Header() {
    const context = useContext(ThemeContext);
    const theme = context?.theme ?? 'light';
    const setTheme = context?.setTheme ?? (() => {});

    return (
        <header className={`header header-${theme}`}>
            <h1>Менеджер задач</h1>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Сменить тему ({theme === 'light' ? 'Тёмная' : 'Светлая'})
            </button>
        </header>
    )
}

export default Header;

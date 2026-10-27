import { createContext } from 'react';

export type ThemeType = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  deleteTask: (id: number) => void;
  changeTask: (id: number) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

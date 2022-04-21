import * as React from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export type themeType = {
  theme: {
    foreground: string;
    background: string;
  };
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<themeType>({
  theme: themes.dark, // デフォルトの値
  toggleTheme: () => {},
});

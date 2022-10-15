import React from 'react';

import {light, dark} from '../constants/';
import {ITheme, IThemeProvider} from '../constants/types';

export const ThemeContext = React.createContext({
  theme: light || dark,
  setTheme: () => {},
});

export const ThemeProvider = ({
  children,
  theme = light || dark,
  setTheme = () => {},
}: IThemeProvider) => {
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme(): ITheme {
  const {theme} = React.useContext(ThemeContext);
  return theme;
}

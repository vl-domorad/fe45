import React from "react";

import { ThemeProvider } from "./context/Theme";
import { Theme } from "./@types";
import Router from "src/pages/Router";
import { useDispatch, useSelector } from "react-redux";
import { setThemeValue, ThemeSelectors } from "src/redux/reducers/themeSlice";

const App = () => {
  const dispatch = useDispatch();

  //то, что данные из редакса достает
  const themeValue = useSelector(ThemeSelectors.getThemeValue);
  const onChangeTheme = (value: Theme) => () => {
    dispatch(setThemeValue(value)); // то, что швыряет в редакс данные
  };

  return (
    <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;

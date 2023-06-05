import React, { useState } from "react";

import SignUp from "./pages/SignUp";
import { ThemeProvider } from "./context/Theme";
import { Theme } from "./@types";
import ThemeSwitcher from "./components/ThemeSwitcher";

const App = () => {
  const [themeValue, setThemeValue] = useState<Theme>(Theme.Light);

  const onChangeTheme = (value: Theme) => () => {
    setThemeValue(value);
  };

  return (
    <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
      <SignUp />
      <ThemeSwitcher />
    </ThemeProvider>
  );
};

export default App;

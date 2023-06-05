import React from "react";
import classNames from "classnames";

import { useThemeContext } from "src/context/Theme";
import { MoonIcon, SunIcon } from "src/assets/icons";
import { Theme } from "src/@types";

import styles from "./ThemeSwitcher.module.scss";

const ThemeSwitcher = () => {
  const { themeValue, onChangeTheme } = useThemeContext();

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.button, {
          [styles.activeButton]: themeValue === Theme.Light,
        })}
        onClick={onChangeTheme(Theme.Light)}
      >
        <SunIcon />
      </div>
      <div
        className={classNames(styles.button, {
          [styles.activeButton]: themeValue === Theme.Dark,
        })}
        onClick={onChangeTheme(Theme.Dark)}
      >
        <MoonIcon />
      </div>
    </div>
  );
};

export default ThemeSwitcher;

import React, { FC } from "react";
import classNames from "classnames";

import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";

import styles from "./Title.module.scss";

type TitleProps = {
  title: string;
  className?: string;
};

const Title: FC<TitleProps> = ({ title, className }) => {
  const { themeValue } = useThemeContext();

  return (
    <div
      className={classNames(styles.title, className, {
        [styles.darkTitle]: themeValue === Theme.Dark,
      })}
    >
      {title}
    </div>
  );
};
export default Title;

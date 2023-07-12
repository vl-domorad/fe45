import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import Button, { ButtonTypes } from "src/components/Button";
import { CloseIcon, MenuIcon, SearchIcon } from "src/assets/icons";
import ThemeSwitcher from "src/components/ThemeSwitcher";
import { RoutesList } from "src/pages/Router";
import Username from "src/components/Username";
import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";

import styles from "./Header.module.scss";
import { AuthSelectors, logoutUser } from "src/redux/reducers/authSlice";
import Input from "src/components/Input";

const Header = () => {
  const { themeValue } = useThemeContext();
  const [inputValue, setInputValue] = useState("");

  // открытие и закрытие инпутв
  const [isSearch, setSearch] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  const [isOpened, setOpened] = useState(false);

  const navigate = useNavigate();

  const navLinks = useMemo(
    () => [
      { path: RoutesList.Home, title: "Home" },
      ...(isLoggedIn ? [{ path: RoutesList.SignUp, title: "Add Post" }] : []),
    ],
    [isLoggedIn]
  );

  const handleMenuOpened = () => {
    setOpened(!isOpened);
  };

  const onLoginButtonClick = () => {
    navigate(RoutesList.SignIn);
  };

  const onLogout = () => {
    dispatch(logoutUser());
  };
  const handleSearchOpened = () => {
    setSearch(!isSearch);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div className={styles.header}>
        <div className={styles.headerLeftSide}>
          <Button
            type={ButtonTypes.Primary}
            title={isOpened ? <CloseIcon /> : <MenuIcon />}
            onClick={handleMenuOpened}
            className={styles.burgerMenuButton}
          />
        </div>

        {isSearch ? (
          <div className={styles.headerCenterSearch}>
            <Input
              className={styles.inputSearch}
              placeholder="Search..."
              onChange={setInputValue}
              value={inputValue}
            />
            <Button
              type={ButtonTypes.Primary}
              title={<CloseIcon />}
              onClick={handleSearchOpened}
              className={styles.closeSearchButton}
            />
          </div>
        ) : (
          <div> </div>
        )}

        <div className={styles.headerRightSide}>
          <Button
            type={ButtonTypes.Primary}
            title={<SearchIcon />}
            onClick={handleSearchOpened} // пока что так, но по факту должен открываться поиск. UPD поиск найден в компонентах фигма. Делаем через Инпут
            className={styles.searchButton}
          />
          <Button
            type={ButtonTypes.Primary}
            title={<CloseIcon />}
            onClick={onLoginButtonClick}
            className={styles.userButton}
          />
        </div>
      </div>

      <div className={styles.infoContainer}>
        <Outlet />
        <div className={styles.footer}>
          <div>©2022 Blogfolio</div>
          <div>All rights reserved</div>
        </div>
      </div>
      {isOpened && (
        <div className={styles.menuContainer}>
          <div>
            {isLoggedIn && <Username username={"Vladislav"} />}
            {navLinks.map((link) => (
              <NavLink
                to={link.path}
                key={link.path}
                className={styles.navLinkButton}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
          <div>
            <ThemeSwitcher />
            <Button
              type={ButtonTypes.Secondary}
              title={isLoggedIn ? "Log Out" : "Sign In"}
              onClick={isLoggedIn ? onLogout : onLoginButtonClick}
              className={styles.authButton}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

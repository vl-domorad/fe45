import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import useBreadcrumbs from "use-react-router-breadcrumbs";

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
import {
  clearSearchedPosts,
  getSearchedPosts,
  PostSelectors,
} from "src/redux/reducers/postSlice";

const Header = () => {
  const routes = [
    { path: RoutesList.Home, breadcrumb: "Home" },
    { path: RoutesList.SignUp, breadcrumb: "Sign Up" },
    { path: RoutesList.SignIn, breadcrumb: "Sign In" },
    {
      path: RoutesList.SelectedPost,
      breadcrumb: ({ match }: any) => <span>Post {match?.params?.id}</span>,
    },
    {
      path: RoutesList.Search,
      breadcrumb: ({ match }: any) => <span>{match?.params?.search}</span>,
    },
  ];
  const { themeValue } = useThemeContext();
  // открытие и закрытие инпутв

  const breadcrumbs = useBreadcrumbs(routes);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchedPosts = useSelector(PostSelectors.getSearchedPosts);
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  const [inputValue, setInputValue] = useState("");
  const [isSearch, setSearch] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const [isDropdownOpened, setDropdownOpened] = useState(false);

  const navLinks = useMemo(
    () => [
      { path: RoutesList.Home, title: "Home" },
      ...(isLoggedIn ? [{ path: RoutesList.SignUp, title: "Add Post" }] : []),
    ],
    [isLoggedIn]
  );

  useEffect(() => {
    if (inputValue.length) {
      dispatch(
        getSearchedPosts({ search: inputValue, offset: 0, isOverwrite: true })
      );
    } else {
      dispatch(clearSearchedPosts());
    }
  }, [inputValue]);

  const handleMenuOpened = () => {
    setOpened(!isOpened);
  };
  const handleSearchOpened = () => {
    setSearch(!isSearch);
    setDropdownOpened(true);
    if (isSearch && inputValue) {
      dispatch(clearSearchedPosts());
      navigate(`posts/${inputValue}`);
      setInputValue("");
    }
  };

  const onLoginButtonClick = () => {
    navigate(RoutesList.SignIn);
  };

  const onLogout = () => {
    dispatch(logoutUser());
  };

  const onClickDropdownItem = (id: number) => () => {
    setDropdownOpened(false);
    navigate(`/post/${id}`);
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
            {!!searchedPosts.length && isDropdownOpened && (
              <div className={styles.dropdown}>
                {searchedPosts.map(({ title, image, id, text }) => (
                  <div
                    key={id}
                    onClick={onClickDropdownItem(id)}
                    className={styles.dropdownItem}
                  >
                    <img src={image} alt="" />
                    <div className={styles.dropdownItemInfo}>
                      <div className={styles.dropdownItemTitle}>{title}</div>
                      <div className={styles.dropdownItemDescription}>
                        {text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
        <div className={styles.breadcrumbsContainer}>
          {breadcrumbs.map(({ match, breadcrumb }) => (
            <NavLink key={match.pathname} to={match.pathname}>
              {breadcrumb}
            </NavLink>
          ))}
        </div>
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

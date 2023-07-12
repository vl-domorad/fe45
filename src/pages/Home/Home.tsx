import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "src/components/Title";
import CardsList from "src/components/CardsList";
import TabsList from "src/components/TabsList";
import { TabsTypes } from "src/@types";
import SelectedPostModal from "src/pages/Home/SelectedPostModal";
import { getPostsList, PostSelectors } from "src/redux/reducers/postSlice";
import { PER_PAGE } from "src/utils/constants";
import Pagination from "src/components/Pagination";

import styles from "./Home.module.scss";

const Home = () => {
  const dispatch = useDispatch();

  const cardsList = useSelector(PostSelectors.getPostsList);
  const totalCount = useSelector(PostSelectors.getTotalPostsCount);
  const isListLoading = useSelector(PostSelectors.getPostsListLoading)

  const [activeTab, setActiveTab] = useState(TabsTypes.All);
  const [isLoggedIn, setLoggedIn] = useState(false);

  //текущая страница, на которой мы находимся
  const [currentPage, setCurrentPage] = useState(1);

  //сколько итого у нас страниц
  const pagesCount = useMemo(
    () => Math.ceil(totalCount / PER_PAGE),
    [totalCount]
  );

  const tabsList = useMemo(
    () => [
      { key: TabsTypes.All, title: "All Posts", disabled: false },
      { key: TabsTypes.Popular, title: "Popular Posts", disabled: false },
      {
        key: TabsTypes.MyPosts,
        title: "My Posts",
        disabled: !isLoggedIn,
      },
    ],
    [isLoggedIn]
  );

  useEffect(() => {
    // сколько надо пропустить постов (сколько мы уже посмотрели)
    const offset = (currentPage - 1) * PER_PAGE;
    dispatch(getPostsList({ offset, isOverwrite: true }));
  }, [currentPage]);

  const onTabClick = (tab: TabsTypes) => () => {
    setActiveTab(tab);
    if (tab === TabsTypes.Popular) {
      setLoggedIn(true);
    }
  };

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      <Title title={"Blog"} className={styles.pageTitle} />
      <TabsList
        tabsList={tabsList}
        activeTab={activeTab}
        onTabClick={onTabClick}
      />
      <CardsList cardsList={cardsList} isLoading={isListLoading} />
      <Pagination
        currentPage={currentPage}
        pagesCount={pagesCount}
        onPageChange={onPageChange}
      />
      <SelectedPostModal />
    </div>
  );
};

export default Home;

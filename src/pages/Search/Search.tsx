import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { RoutesList } from "src/pages/Router";
import { getSearchedPosts, PostSelectors } from "src/redux/reducers/postSlice";
import Title from "src/components/Title";
import PostCard, { CardTypes } from "src/components/Card";
import { useCardActions } from "src/hooks";
import EmptyState from "src/components/EmptyState";

import styles from "./Search.module.scss";
import { PER_PAGE } from "src/utils/constants";
import Loader from "src/components/Loader";

const Search = () => {
  const { search } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchedPosts = useSelector(PostSelectors.getSearchedPosts);
  const totalPosts = useSelector(PostSelectors.getTotalSearchedPosts);

  const [currentPage, setCurrentPage] = useState(1);

  const { onMoreClick } = useCardActions();

  useEffect(() => {
    if (!search) {
      navigate(RoutesList.Home);
    } else {
      const offset = (currentPage - 1) * PER_PAGE;
      dispatch(getSearchedPosts({ search, offset }));
    }
  }, [dispatch, navigate, search, currentPage]);

  const onNextReached = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Title title={`Search results: "${search}"`} />
      <div className={styles.container} id="scrollableDiv">
        {searchedPosts.length ? (
          <InfiniteScroll
            next={onNextReached}
            scrollThreshold={0.7}
            hasMore={searchedPosts.length < totalPosts}
            loader={<Loader />}
            dataLength={searchedPosts.length}
            scrollableTarget="scrollableDiv"
          >
            {searchedPosts.map((post) => {
              return (
                <PostCard
                  type={CardTypes.Search}
                  onMoreClick={onMoreClick(post)}
                  {...post}
                />
              );
            })}
          </InfiniteScroll>
        ) : (
          <EmptyState
            title={"Nothing was found..."}
            description={"Try another search request"}
          />
        )}
      </div>
    </div>
  );
};

export default Search;

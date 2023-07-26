import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RoutesList } from "src/pages/Router";
import { getSearchedPosts, PostSelectors } from "src/redux/reducers/postSlice";
import Title from "src/components/Title";
import PostCard, { CardTypes } from "src/components/Card";
import { useCardActions } from "src/hooks";
import EmptyState from "src/components/EmptyState";
import { PER_PAGE } from "src/utils/constants";
import Button, { ButtonTypes } from "src/components/Button";

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
      dispatch(getSearchedPosts({ search, offset, isOverwrite: false }));
    }
  }, [dispatch, navigate, search, currentPage]);

  const onNextReached = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Title title={`Search results: "${search}"`} />
      {searchedPosts.length ? (
        <div>
          {searchedPosts.map((post) => {
            return (
              <PostCard
                type={CardTypes.Search}
                onMoreClick={onMoreClick(post)}
                {...post}
              />
            );
          })}
          {searchedPosts.length < totalPosts && (
            <Button
              type={ButtonTypes.Secondary}
              title={"More"}
              onClick={onNextReached}
            />
          )}
        </div>
      ) : (
        <EmptyState
          title={"Nothing was found..."}
          description={"Try another search request"}
        />
      )}
    </div>
  );
};

export default Search;

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DislikeIcon } from "src/assets/icons";
import { LikeIcon } from "src/assets/icons";
import { BookmarkIcon } from "src/assets/icons";
import { getSinglePost, PostSelectors } from "src/redux/reducers/postSlice";

import styles from "./SelectedPost.module.scss";
import { RoutesList } from "src/pages/Router";
import Loader from "src/components/Loader";

const SelectedPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const singlePost = useSelector(PostSelectors.getSinglePost);
  const isSinglePostLoading = useSelector(PostSelectors.getSinglePostLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [id]);

  const onHomeClick = () => {
    navigate(RoutesList.Home);
  };

  return singlePost && !isSinglePostLoading ? (
    <div className={styles.container}>
      <div className={styles.title}>{singlePost.title}</div>
      <div className={styles.selectedPostImage}>
        <img src={singlePost.image} alt="#" />
      </div>

      <div className={styles.selectedPostText}>{singlePost.text}</div>

      <div className={styles.selectedPostReaction}>
        <div className={styles.selectedPostReactionLikeDislike}>
          <div className={styles.SelectedPostLike}>
            <LikeIcon />
          </div>
          <div className={styles.SelectedPostDislike}>
            <DislikeIcon />
          </div>
        </div>
        <div className={styles.selectedPostReactionToFavorites}>
          <BookmarkIcon /> Add to Favotites
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
export default SelectedPost;

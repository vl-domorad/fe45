import { Post } from "src/@types";
import {
  setSelectedPost,
  setSelectedPostModalOpened,
} from "src/redux/reducers/postSlice";
import { useDispatch } from "react-redux";

const useCardActions = () => {
  const dispatch = useDispatch();
  const onMoreClick = (post: Post) => () => {
    dispatch(setSelectedPostModalOpened(true));
    dispatch(setSelectedPost(post));
  };

  return { onMoreClick };
};

export default useCardActions;

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "src/components/Modal";
import {
  PostSelectors,
  setSelectedPost,
  setSelectedPostModalOpened,
} from "src/redux/reducers/postSlice";
import Card, { CardTypes } from "src/components/Card";

const SelectedPostModal = () => {
  const isOpened = useSelector(PostSelectors.getSelectedPostModalOpened);
  const selectedPost = useSelector(PostSelectors.getSelectedPost);

  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(setSelectedPostModalOpened(false));
    dispatch(setSelectedPost(null));
    // dispatch - ручки
    // setSelectedPost - экшен, куда данные должны улететь
    // null - payload, т е сами данные, которые летят в ф-ии, которые их меняют
  };

  return selectedPost ? (
    <Modal isOpen={isOpened} onClose={onCloseModal}>
      <Card type={CardTypes.Large} {...selectedPost} />
    </Modal>
  ) : null;
};

export default SelectedPostModal;

import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { Post, PostsList } from "src/@types";

import Posts, { CardTypes } from "../Card";
import styles from "./CardsList.module.scss";
import {
  setSelectedPost,
  setSelectedPostModalOpened,
} from "src/redux/reducers/postSlice";
import Loader from "src/components/Loader";

type CardsListProps = {
  cardsList: PostsList;
};

const CardsList: FC<CardsListProps> = ({ cardsList }) => {
  const dispatch = useDispatch();
  const onMoreClick = (post: Post) => () => {
    dispatch(setSelectedPostModalOpened(true));
    dispatch(setSelectedPost(post));
    // dispatch - ручки
    // setSelectedPost - экшен, куда данные должны улететь
    // null - payload, т е сами данные, которые летят в ф-ии, которые их меняют
  };

  return cardsList.length ? (
    <div className={styles.cardListContainer}>
      <div className={styles.cardListWrap}>
        <Posts
          type={CardTypes.Large}
          {...cardsList[0]}
          onMoreClick={onMoreClick(cardsList[0])}
        />
        <div className={styles.mediumContainer}>
          {cardsList.map((el, idx) => {
            if (idx >= 1 && idx <= 4) {
              return (
                <Posts
                  key={el.id}
                  type={CardTypes.Medium}
                  {...el}
                  onMoreClick={onMoreClick(el)}
                />
              );
            }
          })}
        </div>
      </div>
      <div className={styles.smallContainer}>
        {cardsList.map((el, idx) => {
          if (idx >= 5 && idx <= 10) {
            return (
              <Posts
                key={el.id}
                type={CardTypes.Small}
                {...el}
                onMoreClick={onMoreClick(el)}
              />
            );
          }
        })}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CardsList;

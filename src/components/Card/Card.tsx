import React, { FC } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import {
  DislikeIcon,
  DotsMenuIcon,
  LikeIcon,
  BookmarkIcon,
} from "src/assets/icons";
import { Post } from "src/@types";

import styles from "./Card.module.scss";

export enum CardTypes {
  Large = "large",
  Medium = "medium",
  Small = "small",
  Search = "search"
}
interface CardProps extends Post {
  onMoreClick?: () => void;
  type: CardTypes;
}

const Card: FC<CardProps> = ({
  type,
  date,
  title,
  text,
  image,
  onMoreClick,
  id,
}) => {
  const cardStyle = styles[type];

  const navigate = useNavigate();

  const onTitleClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div className={classNames(cardStyle)}>
      <div className={styles.cardContent}>
        <div className={styles.cardTextContent}>
          <span className={styles.date}>{date}</span>
          <div className={styles.cardTitle} onClick={onTitleClick}>
            {title}
          </div>
          {type === CardTypes.Large && (
            <div className={styles.cardText}>{text}</div>
          )}
        </div>
        <div className={styles.cardImage}>
          <img src={image} alt="#" />
        </div>
      </div>
      <div className={styles.cardReaction}>
        <div className={styles.cardReationLikeDislike}>
          <LikeIcon />
          <DislikeIcon />
        </div>
        <div className={styles.cardReacrionNavigation}>
          <BookmarkIcon />
          {onMoreClick && (
            <div onClick={onMoreClick}>
              <DotsMenuIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

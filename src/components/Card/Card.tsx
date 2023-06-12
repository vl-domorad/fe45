import React, { FC } from "react";
import classNames from "classnames";

import {
  DislikeIcon,
  DotsMenuIcon,
  LikeIcon,
  BookmarkIcon,
} from "src/assets/icons";

import styles from "./Card.module.scss";

export enum CardTypes {
  Large = "large",
  Medium = "medium",
  Small = "small",
}
type CardProps = {
  type: CardTypes;
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num?: number;
  title: string;
  author?: number;
  onMoreClick?: () => void;
};

const Card: FC<CardProps> = ({
  type,
  date,
  title,
  text,
  image,
  onMoreClick,
}) => {
  const cardStyle = styles[type];

  return (
    <div className={classNames(cardStyle)}>
      <div className={styles.cardContent}>
        <div className={styles.cardTextContent}>
          <span className={styles.date}>{date}</span>
          <div className={styles.cardTitle}>{title}</div>
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

import React, { FC } from "react";
import styles from "./Card.module.scss";
import classNames from "classnames";

import { DislikeIcon, DotsMenuIcon } from "../../assets/icons";
import { LikeIcon } from "../../assets/icons";
import { BookmarkIcon } from "../../assets/icons";

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
};

const Card: FC<CardProps> = ({
  type,
  id,
  date,
  title,
  text,
  image,
  lesson_num,
  author,
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
          <DotsMenuIcon />
        </div>
      </div>
    </div>
  );
};


export default Card;

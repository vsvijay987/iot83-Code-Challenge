import React from "react";
import styles from "./Card.module.css";

const Card = ({ id, secret, server, title }) => {
  let image = `https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`;
  return (
    <div className={styles.card}>
      <a target="_blank" href="img_5terre.jpg">
        <img src={image} alt="Cinque Terre" width="600" height="400" />
      </a>
      <div className={styles.desc}>{title}</div>
    </div>
  );
};

export default Card;

import React from "react";
import styles from "./Favourites.module.css";

const Favourites = ({ items, talky }) => (
  <div className={styles.wrapper}>
    <h3>Recent</h3>
    {items.map((item, i) => (
      <button key={i} className={styles.item} onClick={() => talky(item)}>
        {item}
      </button>
    ))}
  </div>
);

export default Favourites;

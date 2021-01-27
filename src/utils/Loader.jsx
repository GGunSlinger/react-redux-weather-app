import React from "react"
import styles from "../css/loader.module.css"

export default function Loader() {
  return (
    <div className={styles.loader}>
      <img src="./loader.svg" alt="" />
    </div>
  )
}

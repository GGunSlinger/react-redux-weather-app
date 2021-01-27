// @ts-ignore:
import styles from "../css/loader.module.css"

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img src="./loader.svg" alt="" />
    </div>
  )
}

export default Loader

// @ts-ignore:
import styles from "./Loader.module.css";

export const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img src="./loader.svg" alt="" />
    </div>
  );
};

export default Loader;

import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading_item}></div>
    </div>
  );
};

export default Loading;

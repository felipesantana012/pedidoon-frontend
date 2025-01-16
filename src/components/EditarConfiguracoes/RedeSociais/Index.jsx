import styles from "./RedeSociais.module.css";

const RedeSociais = () => {
  return (
    <div className={styles.container_redesociais}>
      <h2>Redes Sociais</h2>
      <div className={styles.redesociais}>
        <p>Facebook: facebook.com</p>
        <p>Instagram: instagram.com</p>
        <p>Twitter: twitter.com</p>
      </div>
    </div>
  );
};

export default RedeSociais;

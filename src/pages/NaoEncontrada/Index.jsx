import styles from "./NaoEncontrada.module.css";
import img_not_found from "../../assets/not_found.jpg";

const NaoEncontrada = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Página não encontrada</h1>
      <img src={img_not_found} alt="Página não encontrada" />
    </div>
  );
};

export default NaoEncontrada;

import styles from "./NaoEncontrada.module.css";
import img_nao_encontrada from "../../assets/pagina_nao_encontrada.gif";

const NaoEncontrada = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Página não encontrada</h1>
      <img src={img_nao_encontrada} alt="Página não encontrada" />
    </div>
  );
};

export default NaoEncontrada;

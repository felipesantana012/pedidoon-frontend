import styles from "./Footer.module.css";
import { useAuth } from "../../contexts/AuthContext";

const Footer = () => {
  const { restaurante } = useAuth();
  return (
    <footer className={styles.rodape}>
      {restaurante ? (
        <a
          href={`/restaurante/${restaurante.restaurante_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Site Cliente
        </a>
      ) : (
        <p>Carregando informações do restaurante...</p>
      )}

      <h4>©Inova Software</h4>
      <p>
        Pedid<strong>OO</strong>n
      </p>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useAuth } from "../../contexts/AuthContext";

const Footer = () => {
  const { restaurante } = useAuth();
  return (
    <footer className={styles.rodape}>
      {restaurante ? (
        <Link
          to={`/restaurante/${restaurante.nome_restaurante}/${restaurante.restaurante_id}`}
        >
          Site Cliente
        </Link>
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

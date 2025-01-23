import { Link } from "react-router-dom"; // Importe o Link do React Router
import styles from "./Header.module.css";
import { BASE_URL } from "../../../services/apiService";
import { useEffect } from "react";

const Header = ({ nome_restaurante, img_logo }) => {
  const reloadPagina = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  useEffect(() => {
    if (nome_restaurante) {
      document.title = nome_restaurante;
    }
    if (img_logo) {
      document.getElementById("dynamic-favicon").href = BASE_URL + img_logo;
    }
  }, [nome_restaurante, img_logo]);

  return (
    <div className={styles.cabecalho}>
      <a
        href="#"
        onClick={(e) => reloadPagina(e)}
        className={styles.cabecalho_logo}
      >
        <img src={BASE_URL + img_logo} alt="Logo do site" />
      </a>

      <ul className={styles.cabecalho_menu}>
        <li>
          <a href="#" onClick={(e) => reloadPagina(e)}>
            {nome_restaurante}
          </a>
        </li>

        <li>
          <Link to="#cardapio">Cardápio</Link>
        </li>

        <li>
          <Link to="#contato">Contato</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

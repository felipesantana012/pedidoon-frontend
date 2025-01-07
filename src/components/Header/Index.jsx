import React, { useEffect, useState } from "react";
import { apiService, BASE_URL } from "../../services/apiService.jsx";
import styles from "./Header.module.css";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth.jsx";
import { Link } from "react-router-dom";

const Header = () => {
  const [imgLogo, setImgLogo] = useState("");
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    const getConfig = async () => {
      try {
        const outrasConfig = await apiService.get("outras_config");
        setImgLogo(BASE_URL + outrasConfig.img_logo);
        setNomeRestaurante(outrasConfig.nome_restaurante);
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    };

    getConfig();
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/home" className={styles.logo}>
        <img src={imgLogo} alt="Logo site" />
      </Link>

      <h3>{nomeRestaurante}</h3>

      <FaArrowRightFromBracket
        className={styles.icon}
        onClick={() => {
          logout();
        }}
      />
    </header>
  );
};

export default Header;

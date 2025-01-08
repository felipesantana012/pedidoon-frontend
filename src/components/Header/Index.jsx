import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../services/apiService.jsx";
import styles from "./Header.module.css";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [imgLogo, setImgLogo] = useState("");
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const { logout, restaurante } = useAuth();

  useEffect(() => {
    if (restaurante) {
      setImgLogo(BASE_URL + restaurante.img_logo);
      setNomeRestaurante(restaurante.nome_restaurante);
    }
  }, [restaurante]);

  useEffect(() => {
    if (nomeRestaurante) {
      document.title = nomeRestaurante;
    }
    if (imgLogo) {
      document.getElementById("dynamic-favicon").href = imgLogo;
    }
  }, [nomeRestaurante, imgLogo]);

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

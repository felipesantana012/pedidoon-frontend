import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../services/apiService.jsx";
import styles from "./Header.module.css";
import { FaArrowRightFromBracket, FaRegAddressBook } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { GrDocumentConfig } from "react-icons/gr";

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

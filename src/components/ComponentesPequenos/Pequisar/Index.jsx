import { useState } from "react";
import styles from "./Pesquisar.module.css";
import { CiSearch } from "react-icons/ci";

const Pesquisar = ({ onSearchChange }) => {
  const [pesquisa, setPesquisa] = useState("");

  const handleInputChange = (e) => {
    setPesquisa(e.target.value);
    onSearchChange(e.target.value); // Envia a pesquisa para o componente pai
  };

  return (
    <div className={styles.pesquisar}>
      <input
        type="search"
        placeholder="Pesquise o Item"
        value={pesquisa}
        onChange={handleInputChange}
      />
      <CiSearch className={styles.btn_buscar} />
    </div>
  );
};

export default Pesquisar;

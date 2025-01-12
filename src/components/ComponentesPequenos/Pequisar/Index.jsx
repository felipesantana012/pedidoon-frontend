import { useState } from "react";
import styles from "./Pesquisar.module.css";
import { CiSearch } from "react-icons/ci";

const Pesquisar = () => {
  const [pesquisa, setPesquisa] = useState("");

  const handlePesquisar = async () => {
    console.log(pesquisa);
  };

  return (
    <div className={styles.pesquisar}>
      <input
        type="search"
        placeholder="Pesquise o Item"
        onChange={(e) => setPesquisa(e.target.value)}
      />
      <CiSearch className={styles.btn_buscar} onClick={handlePesquisar} />
    </div>
  );
};

export default Pesquisar;

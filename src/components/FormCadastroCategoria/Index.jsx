import React, { useState } from "react";
import styles from "./FormCadastroCategoria.module.css";
import Loading from "../Loading";
import { useCategorias } from "../../hooks/useCategorias";

const FormCadastroCategoria = ({ handleCreateCategoria }) => {
  const { loading } = useCategorias();
  const [categoriaNome, setCategoriaNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoriaNome.trim()) {
      await handleCreateCategoria(categoriaNome);
      setCategoriaNome("");
    }
  };

  return (
    <div className={styles.cadastro_cardapio_categoria}>
      {loading && <Loading />}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Cadastre nova categoria</h2>
        <div className={styles.input_label}>
          <label htmlFor="categoriaNome">Nome da Categoria</label>
          <input
            id="categoriaNome"
            type="text"
            value={categoriaNome}
            onChange={(e) => setCategoriaNome(e.target.value)}
            className={styles.inputs}
            required
          />
        </div>
        <button type="submit" className={styles.btn_cadastro}>
          Adicionar Categoria
        </button>
      </form>
    </div>
  );
};

export default FormCadastroCategoria;

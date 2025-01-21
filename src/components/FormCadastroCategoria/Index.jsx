import React, { useState } from "react";
import styles from "./FormCadastroCategoria.module.css";
import Input from "../ComponentesPequenos/Input/Index";
import Button from "../ComponentesPequenos/Button/Index";

const FormCadastroCategoria = ({ handleCreateCategoria }) => {
  const [categoriaNome, setCategoriaNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateCategoria(categoriaNome);
    setCategoriaNome("");
  };

  return (
    <div className={styles.cadastro_cardapio_categoria}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Cadastre nova categoria</h2>
        <div className={styles.input_label}>
          <Input
            label="Nome da Categoria"
            value={categoriaNome}
            onChange={(e) => setCategoriaNome(e.target.value)}
            id="categoriaNome"
            required
          />
        </div>
        <Button
          type="submit"
          className={styles.btn_cadastro}
          nome=" Adicionar Categoria"
        />
      </form>
    </div>
  );
};

export default FormCadastroCategoria;

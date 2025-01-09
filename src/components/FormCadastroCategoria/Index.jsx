import React, { useState } from "react";
import { apiService } from "../../services/apiService";
import { showAlertError, showAlertSuccess } from "../../services/alertService";
import styles from "./FormCadastroCategoria.module.css";
import Loading from "../Loading/Index";

const FormCadastroCategoria = ({ setCategorias }) => {
  const [categoriaNome, setCategoriaNome] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoriaSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const novaCategoria = await apiService.post("categorias", {
        nome: categoriaNome,
      });

      setCategorias((prevCategorias) => [...prevCategorias, novaCategoria]);
      showAlertSuccess(`Categoria ${categoriaNome} adicionada com sucesso!`);
    } catch (error) {
      console.error(error);
      showAlertError("Erro ao adicionar categoria");
    } finally {
      setLoading(false);
    }
    setCategoriaNome("");
  };

  return (
    <div className={styles.cadastro_cardapio_categoria}>
      {loading && <Loading />}
      <form onSubmit={handleCategoriaSubmit} className={styles.form}>
        <h2>Cadastre nova categoria</h2>
        <div className={styles.input_label}>
          <label htmlFor="">Nome da Categoria</label>
          <input
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

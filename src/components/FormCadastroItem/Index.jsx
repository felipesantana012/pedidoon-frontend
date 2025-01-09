import React, { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import { showAlertError, showAlertSuccess } from "../../services/alertService";
import Loading from "../Loading/Index";
import styles from "./FormCadastroItem.module.css";

const FormCadastroItem = ({ categorias }) => {
  const [novoItem, setNovoItem] = useState({
    categoria_id: "",
    nome: "",
    img: "",
    preco: "",
    tipo: "",
    descricao: "",
  });

  const [loading, setLoading] = useState(false);

  const handleNovoItemSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("categoria_id", novoItem.categoria_id);
      formData.append("nome", novoItem.nome);
      formData.append("img", novoItem.img);
      formData.append("preco", novoItem.preco);
      formData.append("tipo", novoItem.tipo);
      formData.append("descricao", novoItem.descricao);

      const response = await apiService.post(
        `categorias/${novoItem.categoria_id}/itens`,
        formData
      );

      showAlertSuccess(`Item ${response.nome} cadastrado com sucesso!`);
      setNovoItem({
        categoria_id: "",
        nome: "",
        img: "",
        preco: "",
        tipo: "",
        descricao: "",
      });
    } catch (error) {
      if (error.status) {
        showAlertError(error.message);
      } else {
        showAlertError("Erro inesperado ao realizar o login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNovoItem((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className={styles.cadastro_cardapio_itens}>
      {loading && <Loading />}
      <form onSubmit={handleNovoItemSubmit} className={styles.form}>
        <h2>Cadastre Novo Item</h2>
        <div className={styles.input_label}>
          <label htmlFor="">Selecione uma categoria</label>
          {categorias.length > 0 ? (
            <select
              name="categoria_id"
              value={novoItem.categoria_id}
              onChange={handleInputChange}
              className={styles.inputs}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          ) : (
            <p>Nenhuma categoria encontrada.</p>
          )}
        </div>
        <div className={styles.input_label}>
          <label>Nome do Item</label>
          <input
            type="text"
            name="nome"
            value={novoItem.nome}
            onChange={handleInputChange}
            className={styles.inputs}
            required
          />
        </div>
        <div className={styles.input_label}>
          <label>Foto do Item</label>
          <input
            type="file"
            name="img"
            onChange={handleInputChange}
            className={styles.inputs}
            required
          />
        </div>
        <div className={styles.input_label}>
          <label>Preço do Item</label>
          <input
            type="number"
            name="preco"
            value={novoItem.preco}
            onChange={handleInputChange}
            className={styles.inputs}
            required
          />
        </div>
        <div className={styles.input_label}>
          <label>Tipo Ou Tamanho</label>
          <input
            type="text"
            name="tipo"
            value={novoItem.tipo}
            onChange={handleInputChange}
            className={styles.inputs}
            required
          />
        </div>
        <div className={styles.input_label}>
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={novoItem.descricao}
            onChange={handleInputChange}
            className={styles.inputs}
            required
          />
        </div>
        <button type="submit" className={styles.btn_cadastro}>
          Adicionar Item
        </button>
      </form>
    </div>
  );
};

export default FormCadastroItem;

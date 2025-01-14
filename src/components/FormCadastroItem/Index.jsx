import React, { useState, useRef, useEffect } from "react";
import Loading from "../Loading";
import styles from "./FormCadastroItem.module.css";
import { useItens } from "../../hooks/useItens";

const FormCadastroItem = ({ categorias }) => {
  const { handleCreateItem, loading } = useItens();
  const fileInputRef = useRef(null);

  const [novoItem, setNovoItem] = useState({
    categoria_id: "",
    nome: "",
    img: "",
    preco: "",
    tipo: "",
    descricao: "",
  });

  const handleNovoItemSubmit = async (e) => {
    e.preventDefault();
    await handleCreateItem(novoItem);
    setNovoItem({
      categoria_id: "",
      nome: "",
      img: "",
      preco: "",
      tipo: "",
      descricao: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
            ref={fileInputRef}
            onChange={handleInputChange}
            className={styles.inputs}
            required
          />
        </div>
        <div className={styles.input_label}>
          <label>Preço do Item</label>
          <input
            type="text"
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

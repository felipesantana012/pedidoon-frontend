import React, { useState, useRef, useEffect } from "react";
import Loading from "../Loading";
import styles from "./FormCadastroItem.module.css";
import { useItens } from "../../hooks/useItens";
import Button from "../ComponentesPequenos/Button";
import Input from "../ComponentesPequenos/Input";

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
            className={styles.select}
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
          <Input
            label="Nome do Item"
            type="text"
            value={novoItem.nome}
            funcao={handleInputChange}
            id="nome"
            name="nome"
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
            className={styles.select}
            required
          />
        </div>
        <div className={styles.input_label}>
          <Input
            label="Preço do Item"
            value={novoItem.preco}
            funcao={handleInputChange}
            id="preco"
            name="preco"
            required
          />
        </div>
        <div className={styles.input_label}>
          <Input
            label="Tipo Ou Tamanho"
            value={novoItem.tipo}
            funcao={handleInputChange}
            id="tipo"
            name="tipo"
            required
          />
        </div>
        <div className={styles.input_label}>
          <Input
            label="Descrição"
            value={novoItem.descricao}
            funcao={handleInputChange}
            id="descricao"
            name="descricao"
            required
          />
        </div>
        <Button nome="Adicionar Item" type="submit" />
      </form>
    </div>
  );
};

export default FormCadastroItem;

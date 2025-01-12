import React, { useState, useEffect } from "react";
import styles from "./Cadastrar_Cardapio.module.css";
import { apiService } from "../../services/apiService";
import Loading from "../../components/Loading/Index";
import FormCadastroCategoria from "../../components/FormCadastroCategoria";
import FormCadastroItem from "../../components/FormCadastroItem";

const Cadastrar_Cardapio = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategorias = async () => {
      setLoading(true);
      try {
        const data = await apiService.get("categorias");
        setCategorias(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getCategorias();
  }, []);

  return (
    <section className={styles.cadastro_cardapio}>
      {loading && <Loading />}
      <h1>Cadastrar Cardápio</h1>
      <FormCadastroCategoria setCategorias={setCategorias} />
      <FormCadastroItem categorias={categorias} />
    </section>
  );
};

export default Cadastrar_Cardapio;

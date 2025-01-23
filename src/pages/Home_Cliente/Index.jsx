import styles from "./Home_Cliente.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Index";
import Header from "../../components/componentesCliente/Header/Index";
import Slides from "../../components/componentesCliente/Slides/Index";
import Categorias from "../../components/componentesCliente/Categorias/Index";
import { useDadosRestauranteCliente } from "../../hooks/useDadosRestauranteCliente";
import PromocaoDia from "../../components/componentesCliente/PromocaoDia/Index";
import Cardapio from "../../components/componentesCliente/Cardapio/Index";
import Localizacao from "../../components/componentesCliente/Localizacao/Index";

const Home_Cliente = () => {
  const { restaurante_id } = useParams();
  const {
    getDadosRestaurante,
    dadosRestaurante,
    itensImgNome,
    loading,
    promocaoDia,
  } = useDadosRestauranteCliente();

  useEffect(() => {
    getDadosRestaurante(restaurante_id);
  }, [restaurante_id]);

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      {dadosRestaurante.outras_config && (
        <Header
          nome_restaurante={dadosRestaurante.outras_config.nome_restaurante}
          img_logo={dadosRestaurante.outras_config.img_logo}
        />
      )}
      <Slides itens={itensImgNome} />
      <div className={styles.content}>
        <Categorias categorias={dadosRestaurante.categorias} />
        <PromocaoDia promocaoDia={promocaoDia} />
      </div>
      <Cardapio categorias={dadosRestaurante.categorias} />
      <Localizacao
        endereco={dadosRestaurante.endereco}
        rede_sociais={dadosRestaurante.rede_sociais}
      />
    </div>
  );
};

export default Home_Cliente;

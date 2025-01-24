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
import Footer from "../../components/componentesCliente/Footer/Index";
import BotaoTopo from "../../components/ComponentesPequenos/BotaoTopo/Index";
import Carrinho from "../../components/componentesCliente/Carrinho/Index";
import { CarrinhoProvider } from "../../contexts/CarrinhoContext";

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
    <CarrinhoProvider>
      <div className={styles.container}>
        {loading && <Loading />}
        {dadosRestaurante.outras_config && (
          <Header
            nome_restaurante={dadosRestaurante.outras_config.nome_restaurante}
            img_logo={dadosRestaurante.outras_config.img_logo}
          />
        )}

        {itensImgNome && <Slides itens={itensImgNome} />}

        <div className={styles.content}>
          {dadosRestaurante.categorias && (
            <Categorias categorias={dadosRestaurante.categorias} />
          )}
          {promocaoDia && <PromocaoDia promocaoDia={promocaoDia} />}
        </div>
        {dadosRestaurante.categorias && (
          <Cardapio categorias={dadosRestaurante.categorias} />
        )}

        {dadosRestaurante.endereco && (
          <Localizacao
            endereco={dadosRestaurante.endereco}
            rede_sociais={dadosRestaurante.rede_sociais}
          />
        )}
        {dadosRestaurante.outras_config && (
          <Footer
            nome_restaurante={dadosRestaurante.outras_config.nome_restaurante}
          />
        )}
        <Carrinho rede_sociais={dadosRestaurante.rede_sociais} />
        <BotaoTopo />
      </div>
    </CarrinhoProvider>
  );
};

export default Home_Cliente;

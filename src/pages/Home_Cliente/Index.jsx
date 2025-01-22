import styles from "./Home_Cliente.module.css";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { apiService } from "../../services/apiService";
import Loading from "../../components/Loading/Index";
import Header from "../../components/componentesCliente/Header/Index";
import Slides from "../../components/componentesCliente/Slides/Index";
import { showAlertError } from "../../services/alertService";

const Home_Cliente = () => {
  const { restaurante_id } = useParams();
  const navigate = useNavigate();
  const [dadosRestaurante, setDadosRestaurante] = useState({
    categorias: [],
    outras_config: {},
  });
  const [loading, setLoading] = useState(false);
  const [itensImgNome, setItensImgNome] = useState([]);

  const get_itensImgNome = () => {
    const itensImgNome = [];
    dadosRestaurante.categorias.forEach((categoria) => {
      if (categoria.itens) {
        categoria.itens.forEach((item) => {
          itensImgNome.push({ img: item.img, nome: item.nome });
        });
      }
    });
    setItensImgNome(itensImgNome);
  };

  const getDadosRestaurante = async () => {
    setLoading(true);
    try {
      const res = await apiService.get(
        `/dados_restaurante_cliente/${restaurante_id}`
      );
      setDadosRestaurante(res);
      console.log(res);
    } catch (error) {
      console.log(error);
      navigate("/nao-encontrada");
      showAlertError("Erro ao buscar dados do restaurante");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDadosRestaurante();
  }, [restaurante_id]);

  useEffect(() => {
    if (dadosRestaurante.categorias) {
      get_itensImgNome();
    }
  }, [dadosRestaurante]);

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
      Home_Cliente {restaurante_id}
    </div>
  );
};

export default Home_Cliente;

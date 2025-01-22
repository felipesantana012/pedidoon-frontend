import styles from "./Home_Cliente.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../../services/apiService";
import Loading from "../../components/Loading/Index";
import Header from "../../components/componentesCliente/Header/Index";

const Home_Cliente = () => {
  const { restaurante_id } = useParams();
  const [dadosRestaurante, setDadosRestaurante] = useState({});
  const [loading, setLoading] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDadosRestaurante();
  }, []);

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      {dadosRestaurante.outras_config && (
        <Header
          nome_restaurante={dadosRestaurante.outras_config.nome_restaurante}
          img_logo={dadosRestaurante.outras_config.img_logo}
        />
      )}
      Home_Cliente {restaurante_id}
    </div>
  );
};

export default Home_Cliente;

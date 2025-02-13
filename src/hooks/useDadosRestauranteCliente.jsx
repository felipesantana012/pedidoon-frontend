import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";
import { showAlertError } from "../services/alertService";

export const useDadosRestauranteCliente = () => {
  const [loading, setLoading] = useState(false);
  const [itensImgNome, setItensImgNome] = useState([]);
  const [promocaoDia, setPromocaoDia] = useState({});
  const [dadosRestaurante, setDadosRestaurante] = useState({});

  const getDadosRestaurante = async (url) => {
    setLoading(true);
    try {
      const res = await apiService.get(`/dados_restaurante_cliente/${url}`);
      setDadosRestaurante(res);
    } catch (error) {
      console.log(error);
      showAlertError("Error ", error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const get_promocaoDia = () => {
    if (dadosRestaurante?.promocao_dia?.itens) {
      setPromocaoDia(dadosRestaurante.promocao_dia.itens);
    } else {
      console.error("Promoção do dia não encontrada nos dados do restaurante.");
    }
  };

  useEffect(() => {
    if (dadosRestaurante.categorias) {
      get_itensImgNome();
    }
  }, [dadosRestaurante]);

  useEffect(() => {
    if (dadosRestaurante.promocao_dia) {
      get_promocaoDia();
    }
  }, [dadosRestaurante]);

  return {
    loading,
    dadosRestaurante,
    getDadosRestaurante,
    itensImgNome,
    promocaoDia,
  };
};

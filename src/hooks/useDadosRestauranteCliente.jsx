import { useState } from "react";
import { apiService } from "../services/apiService";
import { showAlertError } from "../services/alertService";
import { useNavigate } from "react-router-dom";

export const useDadosRestauranteCliente = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [itensImgNome, setItensImgNome] = useState([]);
  const [dadosRestaurante, setDadosRestaurante] = useState({
    categorias: [],
    outras_config: {},
  });

  const getDadosRestaurante = async (restaurante_id) => {
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

  return {
    loading,
    dadosRestaurante,
    getDadosRestaurante,
    itensImgNome,
    get_itensImgNome,
  };
};

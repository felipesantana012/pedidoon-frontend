import { useEffect, useState } from "react";
import Pesquisar from "../../components/ComponentesPequenos/Pequisar/Index";
import styles from "./Modificar_Cardapio.module.css";
import { apiService, BASE_URL } from "../../services/apiService";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscSaveAs } from "react-icons/vsc";
import Loading from "../../components/Loading/Index";
import {
  showAlertDelete,
  showAlertError,
  showAlertSuccess,
} from "../../services/alertService";

const Modificar_Cardapio = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nomesCategoriasEditados, setNomesCategoriasEditados] = useState({});

  const deletarCategoria = async (categoria_id) => {
    try {
      await apiService.delete(`categorias/${categoria_id}`);
      setCategorias((prevCategorias) =>
        prevCategorias.filter((categoria) => categoria.id !== categoria_id)
      );
      showAlertSuccess("Categoria deletada com sucesso!");
    } catch (error) {
      if (error.status) {
        showAlertError("Erro ao deletar categoria", error.message);
      } else {
        showAlertError("Erro ao deletar categoria", "Error desconhecido.");
      }
    }
  };

  const atualizarCategoria = async (categoria_id, nome) => {
    setLoading(true);
    try {
      await apiService.put(`categorias/${categoria_id}`, { nome });
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria.id === categoria_id ? { ...categoria, nome } : categoria
        )
      );
      setNomesCategoriasEditados((prev) => {
        const updatedNames = { ...prev };
        delete updatedNames[categoria_id];
        return updatedNames;
      });
      showAlertSuccess("Categoria atualizada com sucesso!");
    } catch (error) {
      if (error.status) {
        showAlertError("Erro ao atualizar categoria", error.message);
      } else {
        showAlertError("Erro ao atualizar categoria", "Error desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  const LidarMudadancaNomeCategoria = (categoria_id, nome) => {
    setNomesCategoriasEditados((prev) => ({
      ...prev,
      [categoria_id]: nome,
    }));
  };

  useEffect(() => {
    const getCategoriasItens = async () => {
      setLoading(true);
      try {
        const categoriasResponse = await apiService.get("categorias");
        setCategorias(categoriasResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getCategoriasItens();
  }, []);

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <h1>Modificar Cardápio</h1>
      <Pesquisar />
      <div className={styles.categorias_itens}>
        {categorias &&
          categorias.map((categoria) => (
            <div key={categoria.id} className={styles.categorias}>
              <div className={styles.categoria}>
                <input
                  type="text"
                  value={
                    nomesCategoriasEditados[categoria.id] || categoria.nome
                  }
                  onChange={(e) =>
                    LidarMudadancaNomeCategoria(categoria.id, e.target.value)
                  }
                />

                <VscSaveAs
                  className={styles.salvar}
                  onClick={() =>
                    atualizarCategoria(
                      categoria.id,
                      nomesCategoriasEditados[categoria.id] || categoria.nome
                    )
                  }
                />
                <RiDeleteBin6Line
                  className={styles.deletar}
                  onClick={() =>
                    showAlertDelete(() => deletarCategoria(categoria.id))
                  }
                />
              </div>

              <ul className={styles.itens}>
                {categoria.itens.map((item) => (
                  <li key={item.id} className={styles.item}>
                    <img src={BASE_URL + item.img} alt={item.nome} />
                    <p>{item.nome}</p>
                    <p>{item.preco}</p>
                    <p>{item.descricao}</p>
                    <p>{item.tipo}</p>
                    <p>{item.disponivel} Disponível</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Modificar_Cardapio;

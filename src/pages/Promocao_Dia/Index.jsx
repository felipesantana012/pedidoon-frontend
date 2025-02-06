import { useEffect, useState } from "react";
import { apiService, BASE_URL } from "../../services/apiService";
import styles from "./Promocao_Dia.module.css";
import { useItens } from "../../hooks/useItens";
import Loading from "../../components/Loading/Index";
import DataAtual from "../../components/ComponentesPequenos/DataAtual/Index";
import Pesquisar from "../../components/ComponentesPequenos/Pequisar/Index";
import { showAlertError, showAlertSuccess } from "../../services/alertService";

const Promocao_Dia = () => {
  const { itens, fetchAllItensDisponiveisRestaurante } = useItens();
  const [promocao, setPromocao] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  const BuscarPromocao = async () => {
    setLoading(true);
    try {
      const promo = await apiService.get("promocao_dia");
      setPromocao(promo.itens);
    } catch (error) {
      console.error("Erro ao buscar promoção:", error);
    } finally {
      setLoading(false);
    }
  };

  const definirPromocao = async (item_id) => {
    setLoading(true);
    try {
      await apiService.put("/promocao_dia", { item_id });
      const novoItemPromocao = itens.find((item) => item.id === item_id);
      setPromocao(novoItemPromocao);
    } catch (error) {
      showAlertError("Erro ao definir promoção.", error.message);
      console.error("Erro ao definir promoção:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    BuscarPromocao();
    fetchAllItensDisponiveisRestaurante();
  }, []);

  // 🔍 Filtrar itens com base no texto da pesquisa
  const itensFiltrados = itens.filter((item) =>
    item.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <h1>Promoção do Dia</h1>
      <DataAtual />
      <div className={styles.promocao_dia}>
        {promocao ? (
          <>
            <img src={BASE_URL + promocao.img} alt={promocao.nome} />
            <p>{promocao.nome}</p>
            <p>
              <strong>Preço: R$ {promocao.preco}</strong>
            </p>
          </>
        ) : (
          <p>Sem promoção do dia no momento.</p>
        )}
        <button onClick={() => definirPromocao(null)}>
          Desativar promoção
        </button>
      </div>

      <Pesquisar onSearchChange={setPesquisa} />

      <div className={styles.todos_itens}>
        {itensFiltrados.length > 0 ? (
          itensFiltrados.map((item) => (
            <div
              key={item.id}
              className={`${styles.itens} ${
                promocao && promocao.id === item.id ? styles.promocao_ativa : ""
              }`}
              onClick={() => definirPromocao(item.id)}
            >
              <div className={styles.contentImg}>
                <img src={BASE_URL + item.img} alt={item.nome} />
              </div>
              <p>{item.nome}</p>
              <p>
                <strong>Preço: R$ {item.preco}</strong>
              </p>
            </div>
          ))
        ) : (
          <p>Nenhum item encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Promocao_Dia;

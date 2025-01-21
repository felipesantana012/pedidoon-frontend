import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import styles from "./Promocao_Dia.module.css";
import { useItens } from "../../hooks/useItens";
import Loading from "../../components/Loading/Index";

const Promocao_Dia = () => {
  const { itens, fetchAllItensDisponiveisRestaurante } = useItens();
  const [promocao, setPromocao] = useState(null);
  const [loading, setLoading] = useState(false);

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
      console.error("Erro ao definir promoção:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    BuscarPromocao();
    fetchAllItensDisponiveisRestaurante();
  }, []);

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <h1>Promoção do Dia</h1>

      <div className={styles.promocao_dia}>
        {promocao ? (
          <>
            <p>{promocao.nome}</p>
            <h2>{promocao.tipo}</h2>
            <p>Preço: R$ {promocao.preco}</p>
          </>
        ) : (
          <p>Sem promoção do dia no momento.</p>
        )}
      </div>

      <div className={styles.todos_itens}>
        <button onClick={() => definirPromocao(null)}>
          Desativar promoção do dia
        </button>
        {itens &&
          itens.map((item) => (
            <div
              key={item.id}
              className={`${styles.itens} ${
                promocao && promocao.id === item.id ? styles.promocao_ativa : ""
              }`}
              onClick={() => definirPromocao(item.id)}
            >
              <p>{item.nome}</p>
              <p>{item.descricao}</p>
              <p>Preço: R$ {item.preco}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Promocao_Dia;

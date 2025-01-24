import styles from "./Cardapio.module.css";
import { BASE_URL } from "../../../services/apiService";
import Loading from "../../Loading/Index";
import { useCarrinho } from "../../../contexts/CarrinhoContext";
import { useState } from "react";

const Cardapio = ({ categorias }) => {
  const { adicionarAoCarrinho } = useCarrinho();
  const [quantidades, setQuantidades] = useState({});
  const [erros, setErros] = useState({});

  const atualizarQuantidade = (itemId, valor) => {
    setQuantidades((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + valor),
    }));
    setErros((prev) => ({ ...prev, [itemId]: "" }));
  };

  const addItemCarrinho = (item) => {
    if (quantidades[item.id] > 0) {
      adicionarAoCarrinho(item, quantidades[item.id]);
      setQuantidades((prev) => ({ ...prev, [item.id]: 0 }));
    } else {
      setErros((prev) => ({
        ...prev,
        [item.id]: "Selecione uma quantidade válida",
      }));
    }
  };

  return (
    <div className={styles.cardapio}>
      <h2>Cardápio</h2>
      {categorias ? (
        categorias.map((categoria) => (
          <div
            key={categoria.id}
            id={categoria.nome}
            className={styles.container_categoria}
          >
            <h2>{categoria.nome}</h2>
            <div className={styles.container_itens}>
              {categoria.itens.map((item) => (
                <div key={item.id} className={styles.card_item}>
                  <div className={styles.descricao_item}>
                    <h3>{item.nome}</h3>
                    <ul className={styles.info_item}>
                      <li>{item.tipo}</li>
                      <li className={styles.preco}>
                        Por: <strong>R$ {item.preco}</strong>
                      </li>
                    </ul>
                    <p>{item.descricao}</p>
                    <div className={styles.item_acoes}>
                      <button
                        className={styles.botao_adicionar}
                        onClick={() => addItemCarrinho(item)}
                      >
                        Adicionar
                      </button>
                      <div className={styles.contador}>
                        <i onClick={() => atualizarQuantidade(item.id, 1)}>+</i>
                        <span>{quantidades[item.id] || 0}</span>
                        <i onClick={() => atualizarQuantidade(item.id, -1)}>
                          -
                        </i>
                      </div>
                    </div>
                    {erros[item.id] && (
                      <span className={styles.mensagemErro}>
                        {erros[item.id]}
                      </span>
                    )}
                  </div>
                  <div className={styles.item_imagem}>
                    <img src={BASE_URL + item.img} alt={item.nome} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Cardapio;

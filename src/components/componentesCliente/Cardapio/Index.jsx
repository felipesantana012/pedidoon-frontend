import styles from "./Cardapio.module.css";
import { BASE_URL } from "../../../services/apiService";
import Loading from "../../Loading/Index";

const Cardapio = ({ categorias }) => {
  return (
    <div className={styles.cardapio}>
      <h2>Cardapio</h2>
      {categorias ? (
        categorias.map((categoria) => (
          <div
            key={categoria.id}
            id={categoria.nome}
            className={styles.container_categoria}
          >
            <h2>{categoria.nome}</h2>

            <div className={styles.container_itens}>
              {categoria.itens &&
                categoria.itens.map((item) => (
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
                        <button className={styles.botao_adicionar}>
                          Adicionar
                        </button>
                        <div className={styles.contador}>
                          <i>+</i>
                          <span>0</span>
                          <i>-</i>
                        </div>
                      </div>
                      <span className={styles.mensagemErro}></span>
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

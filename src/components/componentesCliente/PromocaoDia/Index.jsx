import { BASE_URL } from "../../../services/apiService";
import styles from "./PromocaoDia.module.css";

const PromocaoDia = ({ promocaoDia }) => {
  if (!promocaoDia || !promocaoDia.nome) {
    return null;
  }

  return (
    <div className={styles.promocao_dia}>
      <h2>Promoção do dia</h2>

      <div className={styles.prato__descricoes__img}>
        <div className={styles.prato__descricoes}>
          <h3>{promocaoDia.nome}</h3>
          <ul className={styles.prato__descricoes_informacoes}>
            <li>{promocaoDia.tipo}</li>
            <li className={styles.preco}>Por: {promocaoDia.preco}</li>
          </ul>
          <p className={styles.prato__descricoes_final}>
            {promocaoDia.descricao}
          </p>
        </div>

        <div className={styles.prato__img}>
          <img src={BASE_URL + promocaoDia.img} alt={promocaoDia.nome} />
        </div>
      </div>
    </div>
  );
};

export default PromocaoDia;

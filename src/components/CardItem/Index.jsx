import { showAlertDelete } from "../../services/alertService";
import { BASE_URL } from "../../services/apiService";
import styles from "./CardItem.module.css";

const CardItem = ({
  item,
  categoria_id,
  handleDeleteItem,
  handleUpdateItem,
}) => {
  return (
    <div className={styles.cardItem}>
      <div className={styles.cardItem__info}>
        <div className={styles.cardItem__info__name}>{item.nome}</div>
        <div className={styles.cardItem__info__price}>R$ {item.preco}</div>
        <div className={styles.cardItem__info__description}>
          {item.descricao}
        </div>
        <img src={BASE_URL + item.img} alt={item.nome} />
      </div>
      <div className={styles.cardItem__buttons}>
        <button
          className={styles.cardItem__buttons__edit}
          onClick={() => handleUpdateItem(item.id, categoria_id, item)}
        >
          Editar
        </button>
        <button
          className={styles.cardItem__buttons__delete}
          onClick={() =>
            showAlertDelete(() => handleDeleteItem(item.id, categoria_id))
          }
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default CardItem;

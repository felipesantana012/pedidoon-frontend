import { useEffect } from "react";
import { useItens } from "../../hooks/useItens";
import CardItem from "../CardItem/Index";
import styles from "./Modificar_Itens.module.css";

const Modificar_Itens = ({ categoria_id }) => {
  const { itens, fetchItens, loading, handleDeleteItem, handleUpdateItem } =
    useItens();

  useEffect(() => {
    fetchItens(categoria_id);
  }, []);

  return (
    <ul className={styles.container}>
      {loading && <p>Carregando...</p>}
      {itens.length > 0 ? (
        itens.map((item) => (
          <div className={styles.itens} key={item.id}>
            <CardItem
              item={item}
              categoria_id={categoria_id}
              handleDeleteItem={handleDeleteItem}
              handleUpdateItem={handleUpdateItem}
            />
          </div>
        ))
      ) : (
        <p>Não há itens nesta categoria.</p>
      )}
    </ul>
  );
};

export default Modificar_Itens;

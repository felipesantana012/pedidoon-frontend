import CategoriaItem from "../CategoriaItem";
import styles from "./CategoriaList.module.css";

const CategoriaList = ({
  categorias,
  onDeleteCategoria,
  onUpdateCategoria,
}) => {
  return (
    <div className={styles.categorias}>
      {categorias.map((categoria) => (
        <CategoriaItem
          key={categoria.id}
          categoria={categoria}
          onDeleteCategoria={onDeleteCategoria}
          onUpdateCategoria={onUpdateCategoria}
        />
      ))}
    </div>
  );
};

export default CategoriaList;

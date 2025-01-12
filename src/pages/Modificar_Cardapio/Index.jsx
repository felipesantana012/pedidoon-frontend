import { useCategorias } from "../../hooks/useCategorias";
import Loading from "../../components/Loading";
import CategoriaList from "../../components/Categoria/CategoriaList";
import styles from "./Modificar_Cardapio.module.css";

const ModificarCardapio = () => {
  const { categorias, loading, handleDeleteCategoria, handleUpdateCategoria } =
    useCategorias();

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <h1>Modificar Cardápio</h1>
      <CategoriaList
        categorias={categorias}
        onDeleteCategoria={handleDeleteCategoria}
        onUpdateCategoria={handleUpdateCategoria}
      />
    </div>
  );
};

export default ModificarCardapio;

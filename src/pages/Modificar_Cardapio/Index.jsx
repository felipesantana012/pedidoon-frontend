import { useCategorias } from "../../hooks/useCategorias";
import Loading from "../../components/Loading";
import styles from "./Modificar_Cardapio.module.css";
import Modificar_Categoria from "../../components/Modificar_Categoria/Index";
import Modificar_Itens from "../../components/Modificar_Itens/Index";

const ModificarCardapio = () => {
  const { categorias, loading, handleDeleteCategoria, handleUpdateCategoria } =
    useCategorias();

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <h1>Modificar Cardápio</h1>

      <div className={styles.listaCategorias}>
        {categorias.map((categoria) => (
          <div className={styles.categorias_itens} key={categoria.id}>
            <Modificar_Categoria
              categoria={categoria}
              onDeleteCategoria={handleDeleteCategoria}
              onUpdateCategoria={handleUpdateCategoria}
            />

            <Modificar_Itens categoria_id={categoria.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModificarCardapio;

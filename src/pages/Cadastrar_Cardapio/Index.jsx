import styles from "./Cadastrar_Cardapio.module.css";
import FormCadastroCategoria from "../../components/FormCadastroCategoria/Index";
import FormCadastroItem from "../../components/FormCadastroItem/Index";
import { useCategorias } from "../../hooks/useCategorias";
import Loading from "../../components/Loading";

const Cadastrar_Cardapio = () => {
  const { handleCreateCategoria, categorias, loading } = useCategorias();

  return (
    <section className={styles.cadastro_cardapio}>
      {loading && <Loading />}
      <h1>Cadastrar Cardápio</h1>
      <FormCadastroCategoria handleCreateCategoria={handleCreateCategoria} />
      <FormCadastroItem categorias={categorias} />
    </section>
  );
};

export default Cadastrar_Cardapio;

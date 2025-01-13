import styles from "./Cadastrar_Cardapio.module.css";
import FormCadastroCategoria from "../../components/FormCadastroCategoria/Index";
import FormCadastroItem from "../../components/FormCadastroItem/Index";
import { useCategorias } from "../../hooks/useCategorias";

const Cadastrar_Cardapio = () => {
  const { handleCreateCategoria, categorias } = useCategorias();

  return (
    <section className={styles.cadastro_cardapio}>
      <h1>Cadastrar Cardápio</h1>
      <FormCadastroCategoria handleCreateCategoria={handleCreateCategoria} />
      <FormCadastroItem categorias={categorias} />
    </section>
  );
};

export default Cadastrar_Cardapio;

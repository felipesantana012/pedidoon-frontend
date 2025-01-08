import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { BiFoodMenu } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { FaRegAddressBook } from "react-icons/fa";
import { GrDocumentConfig } from "react-icons/gr";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Menu Inicial</h1>

      <section className={styles.container_cards}>
        <Link className={styles.card} to="/cardapio_restaurante">
          <h2>Cardapio</h2>
          <BiFoodMenu className={styles.icon} />
          <p>Gerencie suas categorias e itens</p>
        </Link>
        <Link className={styles.card} to="/cardapio_restaurante">
          <h2>Promoção do dia</h2>
          <GiPriceTag className={styles.icon} />
          <p>Escolha um item para Promoção do dia</p>
        </Link>
        <Link className={styles.card} to="/cardapio_restaurante">
          <h2>Endereço e Rede Sociais</h2>
          <FaRegAddressBook className={styles.icon} />
          <p>Atualize seu Endereco e Rede Sociais</p>
        </Link>
        <Link className={styles.card} to="/cardapio_restaurante">
          <h2>Outras Configurações</h2>
          <GrDocumentConfig className={styles.icon} />
          <p>Edite seus dados de Perfil</p>
        </Link>
      </section>
    </div>
  );
};

export default Home;

import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { BiFoodMenu } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { GrDocumentConfig } from "react-icons/gr";
import { LuTextSelect } from "react-icons/lu";
import { HiHome } from "react-icons/hi2";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Menu Inicial</h1>

      <section className={styles.container_cards}>
        <Link className={styles.card} to="/cadastrar_cardapio">
          <h2>Cadastrar Cardapio</h2>
          <BiFoodMenu className={styles.icon} />
          <p>Cadastre suas categorias e itens</p>
        </Link>
        <Link className={styles.card} to="/modificar_cardapio">
          <h2>Modificar Cardapio</h2>
          <LuTextSelect className={styles.icon} />
          <p>Modifique suas categorias ou itens</p>
        </Link>
        <Link className={styles.card} to="/promocao_dia">
          <h2>Promoção do dia</h2>
          <GiPriceTag className={styles.icon} />
          <p>Escolha um item para Promoção do dia</p>
        </Link>
        <Link className={styles.card} to="/configuracoes">
          <h2>Configurações</h2>
          <GrDocumentConfig className={styles.icon} />
          <p>Edite seus dados de Perfil</p>
        </Link>

        <Link className={styles.card} to="/cadastrar_bairro">
          <h2>Cadastrar Bairros</h2>
          <HiHome className={styles.icon} />
          <p>Cadastre o bairro e a taxa de entrega</p>
        </Link>
      </section>
    </div>
  );
};

export default Home;

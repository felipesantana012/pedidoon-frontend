import Endereco from "../../components/EditarConfiguracoes/Endereco/Index";
import Login from "../../components/EditarConfiguracoes/Login/Index";
import Perfil from "../../components/EditarConfiguracoes/Perfil/Index";
import RedeSociais from "../../components/EditarConfiguracoes/RedeSociais/Index";
import styles from "./Configuracoes.module.css";

const Configuracoes = () => {
  return (
    <div className={styles.container}>
      <h1>Configuracoes</h1>

      <div className={styles.container_content}>
        <div className={styles.content_secundario}>
          <div className={styles.content}>
            <Perfil />
          </div>

          <div className={styles.content}>
            <Endereco />
          </div>
        </div>

        <div className={styles.content_secundario}>
          <div className={styles.content}>
            <RedeSociais />
          </div>

          <div className={styles.content}>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;

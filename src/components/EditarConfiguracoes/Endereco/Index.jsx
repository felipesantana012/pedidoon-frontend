import styles from "./Endereco.module.css";

const Endereco = () => {
  return (
    <div className={styles.container_endereco}>
      <h2>Endereço</h2>
      <div className={styles.endereco}>
        <p>Rua: Rua das Flores</p>
        <p>Número: 123</p>
        <p>Bairro: Jardim das Flores</p>
        <p>Cidade: São Paulo</p>
      </div>
    </div>
  );
};

export default Endereco;

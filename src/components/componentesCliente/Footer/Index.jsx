import styles from "./Footer.module.css";

const Footer = ({ nome_restaurante }) => {
  return (
    <footer className={styles.rodape}>
      {nome_restaurante ? (
        <h3>{nome_restaurante}</h3>
      ) : (
        <p>Carregando informações do restaurante...</p>
      )}

      <h4>©Inova Software</h4>
      <p>
        Pedid<strong>OO</strong>n
      </p>
    </footer>
  );
};

export default Footer;

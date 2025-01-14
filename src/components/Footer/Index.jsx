import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.rodape}>
      <Link to="/">Site Cliente</Link>

      <h4>©Inova Software</h4>
      <p>
        Pedid<strong>OO</strong>n
      </p>
    </footer>
  );
};

export default Footer;

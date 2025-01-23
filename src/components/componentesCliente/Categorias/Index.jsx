import styles from "./Categorias.module.css";
import { Link } from "react-scroll";

const Categorias = ({ categorias }) => {
  return (
    <div className={styles.categorias}>
      <h2>Categorias</h2>
      <ul>
        {categorias &&
          categorias.map((categoria) => (
            <li key={categoria.id}>
              <Link to={categoria.nome} smooth={true} duration={500}>
                {categoria.nome}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categorias;

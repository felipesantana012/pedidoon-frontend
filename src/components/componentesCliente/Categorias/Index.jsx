import styles from "./Categorias.module.css";

const Categorias = ({ categorias }) => {
  return (
    <div className={styles.categorias}>
      <h2>Categorias</h2>
      <ul>
        {categorias &&
          categorias.map((categoria) => (
            <li key={categoria.id}>
              <a href={"#" + categoria.nome}>{categoria.nome}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categorias;

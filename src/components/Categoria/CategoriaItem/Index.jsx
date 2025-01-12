import { useState } from "react";
import styles from "./CategoriaItem.module.css";
import { showAlertDelete } from "../../../services/alertService";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const CategoriaItem = ({ categoria, onDeleteCategoria, onUpdateCategoria }) => {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(categoria.nome);

  const salvar = () => {
    onUpdateCategoria(categoria.id, nome);
    setEditando(false);
  };

  return (
    <div className={styles.categoria}>
      {editando ? (
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      ) : (
        <span>{categoria.nome}</span>
      )}
      {editando ? (
        <div className={styles.btn_acoes}>
          <button onClick={salvar} className={styles.salvar}>
            Salvar
          </button>
          <button
            onClick={() => setEditando(false)}
            className={styles.cancelar}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className={styles.btn_acoes}>
          <FaRegEdit
            onClick={() => setEditando(true)}
            className={styles.editar}
          />
          <RiDeleteBin6Line
            onClick={() =>
              showAlertDelete(() => onDeleteCategoria(categoria.id))
            }
            className={styles.deletar}
          />
        </div>
      )}
    </div>
  );
};

export default CategoriaItem;

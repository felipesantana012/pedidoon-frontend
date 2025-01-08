import styles from "./Cardapio_Restaurante.module.css";
import { useNavigate } from "react-router-dom";

const Cardapio_Restaurante = () => {
  const navigate = useNavigate();
  return (
    <div>
      Cardapio_Restaurante
      <button className={styles.btn_voltar} onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};

export default Cardapio_Restaurante;

import React, { useState, useEffect } from "react";
import styles from "./Interruptor.module.css";

const Interruptor = ({ ativoInicial, onToggle }) => {
  const [ativo, setAtivo] = useState(ativoInicial || false);

  const alternarEstado = () => {
    const novoEstado = !ativo;
    setAtivo(novoEstado);
    onToggle(novoEstado);
  };

  useEffect(() => {
    setAtivo(ativoInicial);
  }, [ativoInicial]);

  return (
    <div
      className={`${styles.interruptor} ${
        ativo ? styles.ativo : styles.inativo
      }`}
      onClick={alternarEstado}
    >
      <div className={styles.botao}></div>
    </div>
  );
};

export default Interruptor;

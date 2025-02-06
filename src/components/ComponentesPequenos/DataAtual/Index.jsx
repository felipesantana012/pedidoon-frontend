import { useState, useEffect } from "react";
import styles from "./DataAtual.module.css";

const DataAtual = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const hoje = new Date();
    const opcoes = {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const dataFormatada = hoje.toLocaleDateString("pt-BR", opcoes);

    setData(dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1));
  }, []);

  return <p>Hoje é {data}</p>;
};

export default DataAtual;

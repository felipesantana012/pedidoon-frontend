import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import styles from "./BotaoTopo.module.css";

const BotaoTopo = () => {
  const [mostrarBotao, setMostrarBotao] = useState(false);

  useEffect(() => {
    const controlarBotao = () => {
      if (window.scrollY > 100) {
        setMostrarBotao(true);
      } else {
        setMostrarBotao(false);
      }
    };

    window.addEventListener("scroll", controlarBotao);
    return () => window.removeEventListener("scroll", controlarBotao);
  }, []);

  const voltarAoTopo = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: "easeInOutQuad", // Efeito de suavização
    });
  };

  return (
    <>
      {mostrarBotao && (
        <button onClick={voltarAoTopo} className={styles.botaoTopo}>
          ⬆
        </button>
      )}
    </>
  );
};

export default BotaoTopo;

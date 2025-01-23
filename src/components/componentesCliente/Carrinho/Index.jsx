import styles from "./Carrinho.module.css";
import img_carrinho from "../../../assets/icone-carrinho.png";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";

const Carrinho = () => {
  const [itensCarrinho, setItensCarrinho] = useState([
    { id: 1, quantidade: 2, titulo: "Pizza de 4 queijos", valor: "59,90" },
    {
      id: 2,
      quantidade: 1,
      titulo: "Hambúrguer duplo Hambúrguer",
      valor: "29,90",
    },
    { id: 3, quantidade: 4, titulo: "Hambúrguer", valor: "29,90" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <div>
      {!isModalOpen && (
        <button className={styles.carrinho_icone} onClick={toggleModal}>
          <img src={img_carrinho} alt="imagem do carrinho" />
        </button>
      )}

      {isModalOpen && (
        <section className={styles.carrinho_pedidos}>
          <div className={styles.carrinho}>
            <h4 className={styles.carrinho__titulo}>Pedidos no Carrinho</h4>
            <div className={styles.carrinho__fechar} onClick={toggleModal}>
              <IoClose className={styles.icone_fechar} />
            </div>

            <ul className={styles.carrinho__lista__itens}>
              {itensCarrinho.map((item) => (
                <li className={styles.carrinho__item} key={item.id}>
                  <p className={styles.carrinho__item_quantidade}>
                    {item.quantidade} <span>x</span>
                  </p>
                  <p className={styles.carrinho__item_titulo}>{item.titulo}</p>
                  <p className={styles.carrinho__item_valor}>
                    {item.valor}
                    <span>R$</span>
                  </p>
                  <RiDeleteBin5Line
                    className={styles.carrinho__item_deletar}
                    onClick={() =>
                      setItensCarrinho((prev) =>
                        prev.filter(
                          (carrinhoItem) => carrinhoItem.id !== item.id
                        )
                      )
                    }
                  />
                </li>
              ))}
            </ul>

            <h3 className={styles.carrinho__valor_total}>
              Total a Pagar:{" "}
              <span>
                {itensCarrinho
                  .reduce((total, item) => total + parseFloat(item.valor), 0)
                  .toFixed(2)}{" "}
                R$
              </span>
            </h3>
            <div className={styles.carrinho__btns}>
              <button className={styles.carrinho__btn_finalizar}>
                Finalizar Pedido
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Carrinho;

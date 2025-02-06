import styles from "./Carrinho.module.css";
import img_carrinho from "../../../assets/icone-carrinho.png";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { useCarrinho } from "../../../contexts/CarrinhoContext";
import FinalizarPedido from "../FinalizarPedido/Index";

const Carrinho = ({ whatsApp, bairros, pagamento }) => {
  const { itensCarrinho, removerDoCarrinho, calcularTotal } = useCarrinho();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinalizarPedidoOpen, setIsFinalizarPedidoOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const abrirFinalizarPedido = () => setIsFinalizarPedidoOpen(true);
  const fecharFinalizarPedido = () => setIsFinalizarPedidoOpen(false);

  return (
    <div>
      {!isModalOpen && (
        <button className={styles.carrinho_icone} onClick={toggleModal}>
          {itensCarrinho.length > 0 ? (
            <span className={styles.carrinho_quantidade}>
              {itensCarrinho.length}
            </span>
          ) : null}
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
                  <p className={styles.carrinho__item_titulo}>{item.nome}</p>
                  <p className={styles.carrinho__item_valor}>
                    Total: R$ {(item.preco * item.quantidade).toFixed(2)}
                  </p>
                  <RiDeleteBin5Line
                    className={styles.carrinho__item_deletar}
                    onClick={() => removerDoCarrinho(item.id)}
                  />
                </li>
              ))}
            </ul>

            <h3 className={styles.carrinho__valor_total}>
              Total a Pagar: <span>R$ {calcularTotal().toFixed(2)}</span>
            </h3>
            <div className={styles.carrinho__btns}>
              <button
                className={styles.carrinho__btn_finalizar}
                onClick={itensCarrinho.length > 0 ? abrirFinalizarPedido : null}
              >
                Avançar
              </button>
            </div>
          </div>
        </section>
      )}
      {isFinalizarPedidoOpen && (
        <FinalizarPedido
          bairros={bairros}
          whatsApp={whatsApp}
          pagamento={pagamento}
          onClose={fecharFinalizarPedido}
        />
      )}
    </div>
  );
};

export default Carrinho;

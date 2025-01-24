import styles from "./Carrinho.module.css";
import img_carrinho from "../../../assets/icone-carrinho.png";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { useCarrinho } from "../../../contexts/CarrinhoContext";

const Carrinho = () => {
  const { itensCarrinho, removerDoCarrinho } = useCarrinho();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const calcularTotal = () => {
    return itensCarrinho
      .reduce((total, item) => total + item.preco * item.quantidade, 0)
      .toFixed(2);
  };

  const gerarMensagemWhatsApp = () => {
    const total = calcularTotal();
    const itensMensagem = itensCarrinho
      .map(
        (item) =>
          `*${item.quantidade}x ${item.nome}* - R$ ${(
            item.preco * item.quantidade
          ).toFixed(2)}`
      )
      .join("\n");

    return `Olá, gostaria de finalizar o pedido:\n\n${itensMensagem}\n\n*Total a pagar: R$ ${total}*`;
  };

  const finalizarPedido = () => {
    const numeroWhatsApp = "5581984910097";
    const mensagem = encodeURIComponent(gerarMensagemWhatsApp());
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagem}`;
    window.open(linkWhatsApp, "_blank");
  };

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
                  <p className={styles.carrinho__item_titulo}>{item.nome}</p>
                  <p className={styles.carrinho__item_valor}>
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </p>
                  <RiDeleteBin5Line
                    className={styles.carrinho__item_deletar}
                    onClick={() => removerDoCarrinho(item.id)}
                  />
                </li>
              ))}
            </ul>

            <h3 className={styles.carrinho__valor_total}>
              Total a Pagar: <span>R$ {calcularTotal()}</span>
            </h3>
            <div className={styles.carrinho__btns}>
              <button
                className={styles.carrinho__btn_finalizar}
                onClick={finalizarPedido}
              >
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

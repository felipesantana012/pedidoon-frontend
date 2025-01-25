import { useState } from "react";
import { useCarrinho } from "../../../contexts/CarrinhoContext";
import styles from "./FinalizarPedido.module.css";
import Input from "../../ComponentesPequenos/Input/Index";

const FinalizarPedido = ({ onClose, whatsApp }) => {
  const { itensCarrinho, calcularTotal } = useCarrinho();
  const [taxaEntrega, setTaxaEntrega] = useState(0);
  const [mensagemErro, setMensagemErro] = useState("");
  const [formData, setFormData] = useState({
    nomeCliente: "",
    foneCliente: "",
    rua: "",
    numero: "",
    referencia: "",
    pagamento: "",
    bairroSelecionado: {},
    troco: "",
  });

  const bairros = [
    { nome: "Bairro 1", valor: 5.0 },
    { nome: "Bairro 2", valor: 10.0 },
    { nome: "Bairro 3", valor: 15.0 },
  ];

  const pagamentos = ["Cartão", "Dinheiro", "Pix"];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBairroChange = (e) => {
    const bairro = bairros.find((b) => b.nome === e.target.value);
    if (bairro) {
      setFormData((prev) => ({ ...prev, bairroSelecionado: bairro }));
      setTaxaEntrega(bairro.valor);
    } else {
      setTaxaEntrega(0);
    }
  };

  const gerarMensagemWhatsApp = () => {
    const total = (parseFloat(calcularTotal()) + taxaEntrega).toFixed(2);

    const itensMensagem = itensCarrinho
      .map(
        (item) =>
          `*${item.quantidade}x ${item.nome}* - R$ ${(
            item.preco * item.quantidade
          ).toFixed(2)}`
      )
      .join("\n");

    return `Olá, gostaria de finalizar o pedido com os seguintes detalhes:

*Dados do Cliente:*
- Nome: ${formData.nomeCliente || "Não informado"}
- Telefone: ${formData.foneCliente || "Não informado"}

*Endereço de Entrega:*
- Bairro: ${formData.bairroSelecionado?.nome || "Não selecionado"}
- Rua: ${formData.rua || "Não informado"}
- Número: ${formData.numero || "Não informado"}
- Referência: ${formData.referencia || "Não informado"}

*Forma de Pagamento:*
- Método: ${formData.pagamento || "Não selecionado"}
${
  formData.pagamento === "Dinheiro"
    ? `- Troco para: R$ ${formData.troco || "Não informado"}`
    : ""
}

*Itens do Pedido:*
${itensMensagem}

*Subtotal: R$ ${calcularTotal().toFixed(2)}*

*Taxa de entrega: R$ ${taxaEntrega.toFixed(2)}*

*Total a pagar: R$ ${total}*

Por favor, confirme o pedido.`;
  };

  const finalizarPedido = () => {
    const camposObrigatorios = [
      formData.nomeCliente,
      formData.foneCliente,
      formData.rua,
      formData.numero,
      formData.bairroSelecionado.nome,
      formData.pagamento,
    ];

    const camposVazios = camposObrigatorios.some((campo) => !campo);

    if (
      camposVazios ||
      (formData.pagamento === "Dinheiro" && !formData.troco)
    ) {
      setMensagemErro("Antes de finalizar, preencha todos os campos.");

      setTimeout(() => {
        setMensagemErro("");
      }, 4000);

      return;
    }

    const mensagem = encodeURIComponent(gerarMensagemWhatsApp());
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${whatsApp}&text=${mensagem}`;
    window.open(linkWhatsApp, "_blank");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirme seus dados e finalize o pedido</h2>

        <div className={styles.dadosCliente}>
          <Input
            label="Nome e Sobrenome"
            id="nomeCliente"
            value={formData.nomeCliente}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Telefone para contato"
            id="foneCliente"
            value={formData.foneCliente}
            onChange={handleInputChange}
            placeholder="81 9 9999-9999"
            required
          />
        </div>

        <div className={styles.endereco}>
          <h3>Endereço de entrega:</h3>
          <select
            id="bairroSelecionado"
            value={formData.bairroSelecionado.nome}
            onChange={handleBairroChange}
            required
          >
            <option value="">Selecione o bairro</option>
            {bairros.map((bairro) => (
              <option key={bairro.nome} value={bairro.nome}>
                {bairro.nome} - R$ {bairro.valor.toFixed(2)}
              </option>
            ))}
          </select>
          <Input
            label="Rua"
            id="rua"
            value={formData.rua}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Número"
            id="numero"
            value={formData.numero}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Referência"
            id="referencia"
            value={formData.referencia}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.pagamento}>
          <h3>Forma de pagamento:</h3>
          <select
            id="pagamento"
            value={formData.pagamento}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione o método</option>
            {pagamentos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          {formData.pagamento === "Dinheiro" && (
            <Input
              label="Troco para quanto?"
              id="troco"
              value={formData.troco}
              onChange={handleInputChange}
              required
            />
          )}
        </div>

        <div className={styles.pedido}>
          {itensCarrinho.map((item) => (
            <div key={item.id} className={styles.item}>
              <p>
                {item.quantidade}x {item.nome}
              </p>
              <p>R$ {(item.preco * item.quantidade).toFixed(2)}</p>
            </div>
          ))}
          <p>Subtotal: R$ {calcularTotal().toFixed(2)}</p>
          <p>Valor da taxa: R$ {taxaEntrega.toFixed(2)}</p>
          <p>
            Total a Pagar: R$
            {(parseFloat(calcularTotal()) + taxaEntrega).toFixed(2)}
          </p>
        </div>

        <div className={styles.btns}>
          <button className={styles.closeButton} onClick={onClose}>
            Voltar
          </button>
          <button className={styles.confirmButton} onClick={finalizarPedido}>
            Confirmar Pedido
          </button>
        </div>
        {mensagemErro && <p className={styles.errorMessage}>{mensagemErro}</p>}
      </div>
    </div>
  );
};

export default FinalizarPedido;

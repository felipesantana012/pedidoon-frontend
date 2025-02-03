import { useState } from "react";
import { useCarrinho } from "../../../contexts/CarrinhoContext";
import styles from "./FinalizarPedido.module.css";
import Input from "../../ComponentesPequenos/Input/Index";

const FinalizarPedido = ({ onClose, whatsApp }) => {
  const { itensCarrinho, calcularTotal } = useCarrinho();
  const [taxaEntrega, setTaxaEntrega] = useState(0);
  const [mensagemErro, setMensagemErro] = useState("");
  const [trocofinal, setTrocoFinal] = useState(0);
  const [formData, setFormData] = useState({
    nomeCliente: "",
    foneCliente: "",
    rua: "",
    numero: "",
    referencia: "",
    pagamento: "",
    observacao: "",
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
    setTrocoFinal(formData.troco - total);
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

*Itens do Pedido:*
${itensMensagem}

*Observações:* ${formData.observacao || "Sem observações"}

*Valores:*
*Subtotal:* R$ ${calcularTotal().toFixed(2)}
*Taxa de entrega:* R$ ${taxaEntrega.toFixed(2)}
*Total a pagar:* R$ ${total}

*Forma de Pagamento:*
- Método: ${formData.pagamento || "Não selecionado"}
${
  formData.pagamento === "Dinheiro"
    ? `- Troco para: R$ ${formData.troco || "Não informado"}
    - Troco cliente: R$ ${trocofinal.toFixed(2)}`
    : ""
}

Por favor, confirme o pedido.`;
  };

  const finalizarPedido = () => {
    const camposObrigatorios = [
      formData.nomeCliente,
      formData.foneCliente,
      formData.rua,
      formData.numero,
      formData.referencia,
      formData.bairroSelecionado.nome,
      formData.pagamento,
    ];

    if (
      camposObrigatorios.some((campo) => !campo) ||
      (formData.pagamento === "Dinheiro" && !formData.troco)
    ) {
      setMensagemErro("Antes de finalizar, preencha todos os campos.");
      setTimeout(() => setMensagemErro(""), 4000);
      return;
    }

    const mensagem = encodeURIComponent(gerarMensagemWhatsApp());
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${whatsApp}&text=${mensagem}`;
    window.open(linkWhatsApp, "_blank");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.dadosCliente}>
          <h3>Preencha os dados e finalize</h3>

          <div className={styles.contato}>
            <div className={styles.nomeCliente}>
              <Input
                label="Nome e Sobrenome"
                id="nomeCliente"
                value={formData.nomeCliente}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              label="Fone contato"
              id="foneCliente"
              value={formData.foneCliente}
              onChange={handleInputChange}
              placeholder="81 9 9999-9999"
              required
            />
          </div>
        </div>

        <div className={styles.endereco}>
          <label className={styles.label}>
            Endereço de entrega: <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.select}
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
          <div className={styles.ruaEnumero}>
            <div className={styles.nomeRua}>
              <Input
                label="Rua"
                id="rua"
                value={formData.rua}
                onChange={handleInputChange}
                required
              />
            </div>

            <Input
              label="Número"
              id="numero"
              value={formData.numero}
              onChange={handleInputChange}
              required
            />
          </div>

          <Input
            label="Referência"
            id="referencia"
            value={formData.referencia}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.pagamento}>
          <label className={styles.label}>
            Forma de pagamento: <span className={styles.required}>*</span>
          </label>
          <select
            className={styles.select}
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
          <h3>Itens do pedido:</h3>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Quantidade</th>
                <th>Nome</th>
                <th>Preço (R$)</th>
              </tr>
            </thead>
            <tbody>
              {itensCarrinho.map((item) => (
                <tr key={item.id}>
                  <td>{item.quantidade} x</td>
                  <td>{item.nome}</td>
                  <td>{(item.preco * item.quantidade).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Input
            naoObrigatorio={true}
            label="Observações"
            id="observacao"
            value={formData.observacao}
            onChange={handleInputChange}
          />
          <div className={styles.valores}>
            <div className={styles.valor}>
              <p>Subtotal:</p>
              <p>R$ {calcularTotal().toFixed(2)}</p>
            </div>
            <div className={styles.valor}>
              <p>Taxa entrega:</p>
              <p>R$ {taxaEntrega.toFixed(2)}</p>
            </div>
            <div className={styles.valor}>
              <p>Total pagar:</p>
              <strong>
                R$ {(parseFloat(calcularTotal()) + taxaEntrega).toFixed(2)}
              </strong>
            </div>
          </div>
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

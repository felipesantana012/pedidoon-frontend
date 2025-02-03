import { useState } from "react";
import Input from "../../components/ComponentesPequenos/Input/Index";
import styles from "./Cadastrar_Bairro.module.css";
import Button from "../../components/ComponentesPequenos/Button/Index";

const Cadastrar_Bairro = () => {
  const [nomeBairro, setNomeBairro] = useState("");
  const [valorEntrega, setValorEntrega] = useState("");
  const [bairros, setBairros] = useState([
    { id: 1, nome: "Centro", valor: "5.00" },
    { id: 2, nome: "Boa Viagem", valor: "7.00" },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [bairroEditando, setBairroEditando] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoValor, setNovoValor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomeBairro || !valorEntrega) return;

    const novoBairro = {
      id: Date.now(),
      nome: nomeBairro,
      valor: valorEntrega,
    };
    setBairros([...bairros, novoBairro]);

    setNomeBairro("");
    setValorEntrega("");
  };

  const handleExcluir = (id) => {
    setBairros(bairros.filter((bairro) => bairro.id !== id));
  };

  const abrirModal = (bairro) => {
    setBairroEditando(bairro);
    setNovoNome(bairro.nome);
    setNovoValor(bairro.valor);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setBairroEditando(null);
  };

  const salvarEdicao = () => {
    setBairros(
      bairros.map((bairro) =>
        bairro.id === bairroEditando.id
          ? { ...bairro, nome: novoNome, valor: novoValor }
          : bairro
      )
    );
    fecharModal();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.contentForm}>
        <h2>Cadastrar Bairro</h2>
        <Input
          label="Nome do Bairro"
          value={nomeBairro}
          onChange={(e) => setNomeBairro(e.target.value)}
          required
        />

        <Input
          label="Valor da Entrega"
          value={valorEntrega}
          onChange={(e) => setValorEntrega(e.target.value)}
          required
        />

        <Button nome="Cadastrar Bairro" type="submit" />
      </form>

      <div className={styles.listaBairro}>
        <h2>Meus Bairros</h2>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor da Entrega (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {bairros.map((bairro) => (
              <tr key={bairro.id}>
                <td>{bairro.nome}</td>
                <td>{bairro.valor}</td>
                <td>
                  <button
                    className={styles.botaoEditar}
                    onClick={() => abrirModal(bairro)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.botaoExcluir}
                    onClick={() => handleExcluir(bairro.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edição */}
      {modalAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Editar Bairro</h2>
            <Input
              label="Nome do Bairro"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              required
            />

            <Input
              label="Valor da Entrega"
              value={novoValor}
              onChange={(e) => setNovoValor(e.target.value)}
              required
            />

            <div className={styles.modalBotoes}>
              <button className={styles.botaoCancelar} onClick={fecharModal}>
                Cancelar
              </button>
              <button className={styles.botaoSalvar} onClick={salvarEdicao}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cadastrar_Bairro;

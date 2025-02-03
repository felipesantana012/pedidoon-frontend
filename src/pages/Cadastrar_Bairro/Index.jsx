import { useEffect, useState } from "react";
import Input from "../../components/ComponentesPequenos/Input/Index";
import styles from "./Cadastrar_Bairro.module.css";
import Button from "../../components/ComponentesPequenos/Button/Index";
import { apiService } from "../../services/apiService";
import Loading from "../../components/Loading/Index";
import { showAlertDelete, showAlertSuccess } from "../../services/alertService";

const Cadastrar_Bairro = () => {
  const [nomeBairro, setNomeBairro] = useState("");
  const [valorEntrega, setValorEntrega] = useState("");
  const [bairros, setBairros] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [bairroEditando, setBairroEditando] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoValor, setNovoValor] = useState("");
  const [loading, setLoading] = useState(false);

  const getBairros = async () => {
    setLoading(true);
    try {
      const res = await apiService.get("bairros_entrega");
      setBairros(res.map((b) => ({ ...b, valor: b.taxa })));
    } catch (error) {
      console.error("Erro ao buscar bairros:", error);
    } finally {
      setLoading(false);
    }
  };

  const atualizarBairro = async (bairro) => {
    setLoading(true);
    try {
      await apiService.put(`bairros_entrega/${bairro.id}`, {
        nome: bairro.nome,
        taxa: bairro.valor,
      });
      getBairros();
    } catch (error) {
      console.error("Erro ao atualizar bairro:", error);
    } finally {
      setLoading(false);
    }
  };

  const criarBairro = async () => {
    if (!nomeBairro || !valorEntrega) return;

    const novoBairro = {
      nome: nomeBairro,
      taxa: valorEntrega,
    };

    setLoading(true);
    try {
      await apiService.post("bairros_entrega", novoBairro);
      getBairros();
      setNomeBairro("");
      setValorEntrega("");
    } catch (error) {
      console.error("Erro ao cadastrar bairro:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletarBairro = async (id) => {
    setLoading(true);
    try {
      await apiService.delete(`bairros_entrega/${id}`);
      showAlertSuccess("Bairro deletado com sucesso!");
      getBairros();
    } catch (error) {
      console.error("Erro ao deletar bairro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBairros();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    criarBairro();
  };

  const handleExcluir = (id) => {
    showAlertDelete(() => deletarBairro(id));
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
    if (!bairroEditando) return;

    const bairroAtualizado = {
      ...bairroEditando,
      nome: novoNome,
      valor: novoValor,
    };

    atualizarBairro(bairroAtualizado);
    fecharModal();
  };

  return (
    <div className={styles.container}>
      {loading && <Loading />}
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
            <div className={styles.inputs}>
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
            </div>

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

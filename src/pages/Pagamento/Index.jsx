import { useEffect, useState } from "react";
import Input from "../../components/ComponentesPequenos/Input/Index";
import styles from "./Pagamento.module.css";
import Button from "../../components/ComponentesPequenos/Button/Index";
import { apiService } from "../../services/apiService";
import Loading from "../../components/Loading/Index";
import { showAlertDelete, showAlertSuccess } from "../../services/alertService";
import Interruptor from "../../components/ComponentesPequenos/Interruptor/Interruptor";

const Pagamento = () => {
  const [forma, setForma] = useState("");
  const [pagamentos, setPagamentos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [pagamentoEditando, setPagamentoEditando] = useState(null);
  const [novaForma, setNovaForma] = useState("");
  const [novoAtivo, setNovoAtivo] = useState(true);
  const [loading, setLoading] = useState(false);

  const getPagamentos = async () => {
    setLoading(true);
    try {
      const res = await apiService.get("pagamento");
      console.log(res);
      setPagamentos(res);
    } catch (error) {
      console.error("Erro ao buscar formas de pagamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const atualizarPagamento = async (pagamento) => {
    setLoading(true);
    try {
      await apiService.put(`pagamento/${pagamento.id}`, pagamento);
      getPagamentos();
    } catch (error) {
      console.error("Erro ao atualizar pagamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const criarPagamento = async () => {
    if (!forma) return;

    const novoPagamento = {
      forma,
      ativo: true,
    };

    setLoading(true);
    try {
      await apiService.post("pagamento", novoPagamento);
      getPagamentos();
      showAlertSuccess("Forma de pagamento cadastrada com sucesso!");
      setForma("");
    } catch (error) {
      console.error("Erro ao cadastrar pagamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletarPagamento = async (id) => {
    setLoading(true);
    try {
      await apiService.delete(`pagamento/${id}`);
      showAlertSuccess("Forma de pagamento deletada com sucesso!");
      getPagamentos();
    } catch (error) {
      console.error("Erro ao deletar pagamento:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPagamentos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    criarPagamento();
  };

  const handleExcluir = (id) => {
    showAlertDelete(() => deletarPagamento(id));
  };

  const abrirModal = (pagamento) => {
    setPagamentoEditando(pagamento);
    setNovaForma(pagamento.forma);
    setNovoAtivo(pagamento.ativo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPagamentoEditando(null);
  };

  const salvarEdicao = () => {
    if (!pagamentoEditando) return;

    const pagamentoAtualizado = {
      ...pagamentoEditando,
      forma: novaForma,
      ativo: novoAtivo,
    };

    atualizarPagamento(pagamentoAtualizado);
    fecharModal();
  };

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <form onSubmit={handleSubmit} className={styles.contentForm}>
        <h2>Cadastrar Forma de Pagamento</h2>
        <Input
          label="Forma de Pagamento"
          value={forma}
          onChange={(e) => setForma(e.target.value)}
          required
        />
        <Button nome="Cadastrar Pagamento" type="submit" />
      </form>

      <div className={styles.lista_pagamentos}>
        <h2>Formas de Pagamento</h2>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Forma</th>
              <th>Ativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map((pagamento) => (
              <tr key={pagamento.id}>
                <td>{pagamento.forma}</td>
                <td>
                  <Interruptor
                    ativoInicial={pagamento.ativo}
                    onToggle={(novoEstado) =>
                      atualizarPagamento({ ...pagamento, ativo: novoEstado })
                    }
                  />
                </td>
                <td>
                  <button
                    className={styles.botaoEditar}
                    onClick={() => abrirModal(pagamento)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.botaoExcluir}
                    onClick={() => handleExcluir(pagamento.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Editar Pagamento</h2>
            <div className={styles.inputs}>
              <Input
                label="Forma de Pagamento"
                value={novaForma}
                onChange={(e) => setNovaForma(e.target.value)}
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

export default Pagamento;

import { useState, useEffect } from "react";
import styles from "./ListarCategoriasEItens.module.css";
import { apiService } from "../../services/apiService";
import Loading from "../Loading/Index";
import { showAlertError, showAlertSuccess } from "../../services/alertService"; // Certifique-se de ter showAlertSuccess
import PropTypes from "prop-types";

const ListarCategoriasEItens = ({ categorias = [], onCategoriasChange }) => {
  const [itens, setItens] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
  const [editedCategoriaNome, setEditedCategoriaNome] = useState("");

  // Atualiza a lista de categorias quando onCategoriasChange é acionado
  useEffect(() => {
    if (onCategoriasChange) {
      onCategoriasChange();
    }
  }, [onCategoriasChange]);

  const getItens = async (categoria_id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`categorias/${categoria_id}/itens`);
      setItens(response || []);
    } catch (error) {
      if (error.status) {
        showAlertError("Erro ao buscar itens: " + error.message);
      } else {
        showAlertError("Erro inesperado ao buscar itens");
      }
      setItens([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoriaApi = async (categoria_id) => {
    setLoading(true);
    try {
      const categoria = await apiService.get(`categorias/${categoria_id}`);
      setCategoria(categoria);
      setEditedCategoriaNome(categoria.nome); // Inicializa o nome editado
    } catch (error) {
      if (error.status) {
        showAlertError("Erro ao buscar categoria: " + error.message);
      } else {
        showAlertError("Erro inesperado ao buscar categoria");
      }
      setCategoria(null);
      setItens([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoriaChange = (event) => {
    const categoria_id = event.target.value;
    setCategoriaSelecionada(categoria_id);
    if (categoria_id) {
      getItens(categoria_id);
      getCategoriaApi(categoria_id);
    } else {
      setItens([]);
      setCategoria(null);
    }
  };

  const handleAcoesClick = () => {
    setShowModal(true); // Exibir o modal
  };

  const closeModal = () => {
    setShowModal(false); // Fechar o modal
  };

  const handleSave = async () => {
    if (!editedCategoriaNome.trim()) {
      showAlertError("O nome da categoria não pode estar vazio.");
      return;
    }

    setLoading(true);
    try {
      const updatedCategoria = await apiService.put(
        `categorias/${categoria.id}`,
        {
          nome: editedCategoriaNome.trim(),
        }
      );
      setCategoria(updatedCategoria);
      showAlertSuccess("Categoria atualizada com sucesso!");
      // Atualize a lista de categorias se necessário
      if (onCategoriasChange) {
        onCategoriasChange();
      }
      closeModal();
    } catch (error) {
      if (error.status) {
        showAlertError("Erro ao atualizar categoria: " + error.message);
      } else {
        showAlertError("Erro inesperado ao atualizar categoria");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await apiService.delete(`categorias/${categoria.id}`);
      showAlertSuccess("Categoria excluída com sucesso!");
      // Atualize a lista de categorias
      if (onCategoriasChange) {
        onCategoriasChange();
      }
      // Limpe o estado da categoria selecionada
      setCategoriaSelecionada(null);
      setCategoria(null);
      setItens([]);
      closeModal();
    } catch (error) {
      if (error.status) {
        showAlertError("Erro ao excluir categoria: " + error.message);
      } else {
        showAlertError("Erro inesperado ao excluir categoria");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <div className={styles.listagem}>
        <h2>Listagem de Categorias e Itens</h2>

        {/* Seletor de categorias */}
        <div className={styles.input_label}>
          <label htmlFor="categoria_id">Escolha a Categoria</label>
          {categorias.length > 0 ? (
            <select
              name="categoria_id"
              className={styles.inputs}
              onChange={handleCategoriaChange} // Evento de mudança
              value={categoriaSelecionada || ""}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          ) : (
            <p>Nenhuma categoria encontrada.</p>
          )}
        </div>

        {/* Mostrar os dados apenas se uma categoria for selecionada */}
        {categoria && (
          <div className={styles.altecao_item_categoria}>
            <div className={styles.altera_categoria}>
              <h2>{categoria.nome}</h2>
              <button onClick={handleAcoesClick}>Ações</button>
            </div>
            <div>
              <h3>Itens</h3>
              {itens.length > 0 ? (
                <ul className={styles.listaItens}>
                  {itens.map((item) => (
                    <li key={item.id}>
                      <span>{item.nome}</span>
                      <span>{item.preco}</span>
                      <span>{item.tipo}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum item encontrado para esta categoria.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && categoria && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Impedir que o clique no conteúdo feche o modal
          >
            <h2>Ações da Categoria</h2>
            <div className={styles.input_label}>
              <label htmlFor="categoriaNome">Nome da Categoria</label>
              <input
                type="text"
                id="categoriaNome"
                value={editedCategoriaNome}
                onChange={(e) => setEditedCategoriaNome(e.target.value)}
                className={styles.inputs}
              />
            </div>
            <div className={styles.modalButtons}>
              <button onClick={handleSave} className={styles.salvarButton}>
                Salvar
              </button>
              <button onClick={handleDelete} className={styles.excluirButton}>
                Excluir
              </button>
              <button onClick={closeModal} className={styles.fecharButton}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ListarCategoriasEItens.propTypes = {
  categorias: PropTypes.array.isRequired,
  onCategoriasChange: PropTypes.func, // Função para atualizar a lista de categorias no componente pai
};

export default ListarCategoriasEItens;

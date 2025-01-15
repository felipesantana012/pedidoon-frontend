import Interruptor from "../ComponentesPequenos/Interruptor/Interruptor";
import styles from "./ModalEditarItem.module.css";

const ModalEditarItem = ({
  editedItem,
  handleInputChange,
  handleSaveClick,
  handleCancelClick,
}) => {
  const handleToggleDisponivel = (novoEstado) => {
    handleInputChange({
      target: {
        name: "disponivel",
        value: novoEstado,
      },
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Editar Item</h2>

        <div className={styles.interruptor}>
          <label htmlFor="disponivel">Disponível</label>
          <Interruptor
            ativoInicial={editedItem.disponivel}
            onToggle={handleToggleDisponivel}
          />
        </div>

        <label htmlFor="img">Imagem</label>
        <input
          type="file"
          name="img"
          id="img"
          className={styles.inputField}
          onChange={handleInputChange}
        />

        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          name="nome"
          id="nome"
          value={editedItem.nome}
          onChange={handleInputChange}
          className={styles.inputField}
          placeholder="Nome"
        />

        <label htmlFor="tipo">Tipo</label>
        <input
          type="text"
          name="tipo"
          id="tipo"
          value={editedItem.tipo}
          onChange={handleInputChange}
          className={styles.inputField}
          placeholder="Tipo"
        />

        <label htmlFor="preco">Preço</label>
        <input
          type="number"
          name="preco"
          id="preco"
          value={editedItem.preco}
          onChange={handleInputChange}
          className={styles.inputField}
          placeholder="Preço"
        />

        <label htmlFor="descricao">Descrição</label>
        <textarea
          name="descricao"
          id="descricao"
          value={editedItem.descricao}
          onChange={handleInputChange}
          className={styles.textAreaField}
          placeholder="Descrição"
        />

        <div className={styles.modal_buttons}>
          <button
            className={styles.modal_button_save}
            onClick={handleSaveClick}
          >
            Salvar
          </button>
          <button
            className={styles.modal_button_cancel}
            onClick={handleCancelClick}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarItem;

import Interruptor from "../ComponentesPequenos/Interruptor/Interruptor";
import styles from "./ModalEditarItem.module.css";
import Input from "../ComponentesPequenos/Input";
import Button from "../ComponentesPequenos/Button";

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

        <Input
          label="Imagem"
          type="file"
          name="img"
          id="img"
          funcao={handleInputChange}
        />

        <Input
          label="Nome"
          value={editedItem.nome}
          name="nome"
          id="nome"
          funcao={handleInputChange}
          placeholder="Nome"
        />

        <Input
          label="Tipo"
          value={editedItem.tipo}
          name="tipo"
          id="tipo"
          funcao={handleInputChange}
          placeholder="Tipo"
        />

        <Input
          label="Preço"
          value={editedItem.preco}
          name="preco"
          id="preco"
          funcao={handleInputChange}
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
          <Button funcao={handleSaveClick} nome="Salvar" />
          <Button
            funcao={handleCancelClick}
            nome="Cancelar"
            background="#b40000"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalEditarItem;

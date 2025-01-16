import { useState } from "react";
import { showAlertDelete } from "../../services/alertService";
import { BASE_URL } from "../../services/apiService";
import styles from "./CardItem.module.css";
import ModalEditarItem from "../ModalEditarItem/Index";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../ComponentesPequenos/Button";

const CardItem = ({
  item,
  categoria_id,
  handleDeleteItem,
  handleUpdateItem,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({
    nome: item.nome,
    preco: item.preco,
    tipo: item.tipo,
    descricao: item.descricao,
    img: item.img,
    disponivel: item.disponivel,
  });
  const [newImage, setNewImage] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedItem({ ...item });
    setNewImage(null);
  };

  const handleSaveClick = () => {
    if (newImage) {
      const formData = new FormData();
      formData.append("img", newImage);
      formData.append("nome", editedItem.nome);
      formData.append("preco", editedItem.preco);
      formData.append("tipo", editedItem.tipo);
      formData.append("descricao", editedItem.descricao);
      formData.append("disponivel", editedItem.disponivel);
      handleUpdateItem(item.id, categoria_id, formData);
      setIsEditing(false);
    } else {
      const updatedItem = { ...editedItem };
      handleUpdateItem(item.id, categoria_id, updatedItem);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <>
      <div
        className={`${styles.cardItem}  ${
          item.disponivel ? "" : styles.indisponivel
        }`}
      >
        <img src={BASE_URL + item.img} alt={item.nome} />

        <div className={styles.info_container}>
          <p>{item.nome}</p>
          <p className={styles.info_price}>R$ {item.preco}</p>
          <p>{item.tipo}</p>
          <p className={styles.info_description}>{item.descricao}</p>
        </div>

        <div className={styles.buttons}>
          <Button background="#ffb223" funcao={handleEditClick} nome="Editar" />

          <RiDeleteBin6Line
            className={styles.deletar}
            onClick={() =>
              showAlertDelete(() => handleDeleteItem(item.id, categoria_id))
            }
          />
        </div>
      </div>

      {isEditing && (
        <ModalEditarItem
          editedItem={editedItem}
          handleInputChange={handleInputChange}
          handleSaveClick={handleSaveClick}
          handleCancelClick={handleCancelClick}
        />
      )}
    </>
  );
};

export default CardItem;

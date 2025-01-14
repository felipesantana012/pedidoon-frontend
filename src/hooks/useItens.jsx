import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";
import { showAlertError, showAlertSuccess } from "../services/alertService";

export const useItens = () => {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItens = async (categoria_id) => {
    setLoading(true);
    try {
      const response = await apiService.get(`categorias/${categoria_id}/itens`);
      setItens(response); // Atualiza os itens com os dados da API
    } catch (error) {
      showAlertError("Erro ao carregar itens", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (novoItem) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(novoItem).forEach((key) =>
        formData.append(key, novoItem[key])
      );

      const response = await apiService.post(
        `categorias/${novoItem.categoria_id}/itens`,
        formData
      );

      setItens((prev) => [...prev, response]); // Adiciona o novo item ao estado
      showAlertSuccess(`Item ${response.nome} cadastrado com sucesso!`);
    } catch (error) {
      showAlertError("Erro ao adicionar item", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId, categoria_id) => {
    setLoading(true);
    try {
      await apiService.delete(`categorias/${categoria_id}/itens/${itemId}`);
      setItens((prev) => prev.filter((item) => item.id !== itemId)); // Remove o item localmente
      showAlertSuccess("Item deletado com sucesso!");
    } catch (error) {
      showAlertError("Erro ao deletar item", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (itemId, categoria_id, novoItem) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(novoItem).forEach((key) =>
        formData.append(key, novoItem[key])
      );

      const response = await apiService.put(
        `categorias/${categoria_id}/itens/${itemId}`,
        formData
      );

      setItens(
        (prev) => prev.map((item) => (item.id === itemId ? response : item)) // Atualiza o item alterado
      );
      showAlertSuccess("Item atualizado com sucesso!");
    } catch (error) {
      showAlertError("Erro ao atualizar item", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    itens,
    loading,
    fetchItens,
    handleCreateItem,
    handleDeleteItem,
    handleUpdateItem,
  };
};

import { useState, useEffect } from "react";
import { apiService } from "../services/apiService";
import {
  showAlertDelete,
  showAlertError,
  showAlertSuccess,
} from "../services/alertService";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriaEditada, setCategoriaEditada] = useState({});

  // Função para buscar categorias
  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("categorias");
      setCategorias(response);
    } catch (error) {
      showAlertError("Erro ao carregar categorias", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // Função para excluir categoria
  const handleDeleteCategoria = async (categoriaId) => {
    setLoading(true);
    try {
      await apiService.delete(`categorias/${categoriaId}`);
      setCategorias((prev) => prev.filter((cat) => cat.id !== categoriaId));
      showAlertSuccess("Categoria deletada com sucesso!");
    } catch (error) {
      showAlertError("Erro ao deletar categoria", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar categoria
  const handleUpdateCategoria = async (categoriaId, nome) => {
    setLoading(true);
    try {
      await apiService.put(`categorias/${categoriaId}`, { nome });
      setCategorias((prev) =>
        prev.map((cat) => (cat.id === categoriaId ? { ...cat, nome } : cat))
      );
      showAlertSuccess("Categoria atualizada com sucesso!");
    } catch (error) {
      showAlertError("Erro ao atualizar categoria", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    categorias,
    loading,
    handleDeleteCategoria,
    handleUpdateCategoria,
  };
};
import React, { createContext, useState, useEffect, useContext } from "react";
import Loading from "../components/Loading";
import { apiService } from "../services/apiService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restaurante, setRestaurante] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      buscarDadosRestaurante();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
      setRestaurante(null);
      navigate("/login");
    }
  }, [navigate]);

  const buscarDadosRestaurante = async () => {
    try {
      const response = await apiService.get("outras_config");
      setRestaurante(response);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      if (error.status === 401) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    buscarDadosRestaurante();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRestaurante(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, restaurante }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

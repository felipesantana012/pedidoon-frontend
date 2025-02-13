import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Index";
import Home from "../pages/Home/Index";
import NaoEncontrada from "../pages/NaoEncontrada/Index";
import PaginaBase from "../pages/PaginaBase/Index";
import ProtectedRoute from "../routes/ProtectedRoute";
import Home_Cliente from "../pages/Home_Cliente/Index";
import Cadastrar_Cardapio from "../pages/Cadastrar_Cardapio/Index";
import Modificar_Cardapio from "../pages/Modificar_Cardapio/Index";
import { AuthProvider } from "../contexts/AuthContext";
import Promocao_Dia from "../pages/Promocao_Dia/Index";
import Configuracoes from "../pages/Configuracoes/Index";
import Cadastrar_Bairro from "../pages/Cadastrar_Bairro/Index";
import Pagamento from "../pages/Pagamento/Index";
import Historico_Pedidos from "../pages/Historico_Pedidos/Index";

const AppRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="/restaurante/:url" element={<Home_Cliente />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PaginaBase />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastrar_cardapio"
          element={
            <ProtectedRoute>
              <Cadastrar_Cardapio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modificar_cardapio"
          element={
            <ProtectedRoute>
              <Modificar_Cardapio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promocao_dia"
          element={
            <ProtectedRoute>
              <Promocao_Dia />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracoes"
          element={
            <ProtectedRoute>
              <Configuracoes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastrar_bairro"
          element={
            <ProtectedRoute>
              <Cadastrar_Bairro />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pagamento"
          element={
            <ProtectedRoute>
              <Pagamento />
            </ProtectedRoute>
          }
        />
        <Route
          path="/historico_pedidos"
          element={
            <ProtectedRoute>
              <Historico_Pedidos />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  </AuthProvider>
);

export default AppRoutes;

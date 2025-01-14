import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NaoEncontrada from "../pages/NaoEncontrada";
import PaginaBase from "../pages/PaginaBase";
import ProtectedRoute from "../routes/ProtectedRoute";
import Home_Cliente from "../pages/Home_Cliente/Index";
import Cadastrar_Cardapio from "../pages/Cadastrar_Cardapio/Index";
import Modificar_Cardapio from "../pages/Modificar_Cardapio/Index";
import { AuthProvider } from "../contexts/AuthContext";

const AppRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Home_Cliente />} />
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
          path="*"
          element={
            <ProtectedRoute>
              <NaoEncontrada />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </AuthProvider>
);

export default AppRoutes;

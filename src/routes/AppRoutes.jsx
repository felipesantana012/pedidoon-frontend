import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NaoEncontrada from "../pages/NaoEncontrada";
import PaginaBase from "../pages/PaginaBase";
import ProtectedRoute from "../routes/ProtectedRoute";
import Cardapio_Cliente from "../pages/Cardapio_Cliente/Index";
import Cardapio_Restaurante from "../pages/Cardapio_Restaurante/Index";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Cardapio_Cliente />} />
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
          path="/cardapio_restaurante"
          element={
            <ProtectedRoute>
              <Cardapio_Restaurante />
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
  </BrowserRouter>
);

export default AppRoutes;

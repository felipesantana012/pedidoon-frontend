import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/apiService"; // Importe o apiService

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await apiService.post("auth/login", { email, senha });
      if (data.token) {
        login(data.token);
        navigate("/home");
      } else {
        throw new Error("Login falhou");
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/apiService";
import styles from "./Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.container_login}>
      <h1>Login Restaurante</h1>
      <form onSubmit={handleLogin} className={styles.form_login}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="senha">Senha</label>
        <div className={styles.senha_input_icone}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {showPassword ? (
            <FaEye className={styles.icon} onClick={togglePasswordVisibility} />
          ) : (
            <FaEyeSlash
              className={styles.icon}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        <button type="submit" className={styles.btn}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;

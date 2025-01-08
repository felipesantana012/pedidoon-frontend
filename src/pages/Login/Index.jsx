import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/apiService";
import styles from "./Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../components/Loading/Index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setErrorMessage("");
      const data = await apiService.post("auth/login", { email, senha });
      if (data.token) {
        login(data.token);
        navigate("/home");
      } else {
        throw new Error("Login falhou");
      }
    } catch (error) {
      if (error.status) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erro inesperado ao realizar o login");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  if (loading) {
    return <Loading />;
  }

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
        <p className={styles.error}>{errorMessage}</p>
        <button type="submit" className={styles.btn}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;

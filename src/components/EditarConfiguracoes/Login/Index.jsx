import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { apiService } from "../../../services/apiService";
import Input from "../../ComponentesPequenos/Input/Index";
import Button from "../../ComponentesPequenos/Button/Index";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../services/alertService";
import Loading from "../../Loading/Index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const getEmail = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/restaurantes/email");
      setEmail(response.email);
    } catch (error) {
      showAlertError("Erro ao buscar dados de login:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmail = async () => {
    setLoading(true);
    try {
      await apiService.put("/restaurantes/email", { email: email });
      showAlertSuccess("Email atualizado com sucesso!");
      getEmail();
    } catch (error) {
      showAlertError(
        "Erro ao atualizar o email. Tente novamente. " + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSenha = async () => {
    if (senha !== confirmarSenha) {
      showAlertError("As senhas não coincidem. Por favor, verifique.");
      return;
    }
    setLoading(true);
    try {
      await apiService.put("/restaurantes/senha", { senha: senha });
      showAlertSuccess("Senha atualizada com sucesso!");
      setSenha("");
      setConfirmarSenha("");
    } catch (error) {
      showAlertError(
        "Erro ao atualizar a senha. Tente novamente." + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <div className={styles.container_login}>
      {loading && <Loading />}
      <h2>Login</h2>
      <form className={styles.login}>
        <div className={styles.email}>
          <Input
            id="email"
            label="Email de Acesso"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className={styles.button}>
            <Button
              type="button"
              nome={"Salvar Email"}
              onClick={handleSaveEmail}
            />
          </div>
        </div>
        <div className={styles.senhas}>
          <Input
            id="senha"
            label="Nova Senha"
            name="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Input
            id="confirmarSenha"
            label="Confirmar Senha"
            name="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <Button
            type="button"
            nome={"Salvar nova Senha"}
            onClick={handleSaveSenha}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

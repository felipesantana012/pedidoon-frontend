import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.container_login}>
      <h2>Login</h2>
      <div className={styles.login}>
        <p>Email: felipe@gmail.com</p>
        <p>Senha: ********</p>
      </div>
    </div>
  );
};

export default Login;

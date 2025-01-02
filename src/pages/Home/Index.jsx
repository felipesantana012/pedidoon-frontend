import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Bem-vindo à Home!</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Home;

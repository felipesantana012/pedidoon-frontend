import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Index";
import styles from "./PaginaBase.module.css";

const PaginaBase = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default PaginaBase;

import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Index";
import styles from "./PaginaBase.module.css";
import Footer from "../../components/Footer/Index";

const PaginaBase = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PaginaBase;

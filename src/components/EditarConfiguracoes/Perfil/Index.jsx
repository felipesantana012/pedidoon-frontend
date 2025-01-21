import { useEffect, useState } from "react";
import styles from "./Perfil.module.css";
import { apiService, BASE_URL } from "../../../services/apiService";
import Loading from "../../Loading/Index";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../services/alertService";
import Input from "../../ComponentesPequenos/Input/Index";
import Button from "../../ComponentesPequenos/Button/Index";

const Perfil = () => {
  const [perfil, setPerfil] = useState({
    img_logo: "",
    nome_restaurante: "",
    nome_proprietario: "",
  });
  const [novaImgLogo, setNovaImgLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPerfil = async () => {
    setLoading(true);
    try {
      const res = await apiService.get("/outras_config");
      setPerfil(res);
    } catch (error) {
      console.error("Erro ao buscar o perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      if (novaImgLogo) {
        formData.append("img_logo", novaImgLogo);
      } else {
        formData.append("img_logo", perfil.img_logo);
      }
      formData.append("nome_restaurante", perfil.nome_restaurante);
      formData.append("nome_proprietario", perfil.nome_proprietario);

      await apiService.put("/outras_config", formData);
      showAlertSuccess("Perfil atualizado com sucesso!");
      getPerfil();
    } catch (error) {
      console.error("Erro ao salvar o perfil:", error);
      showAlertError("Erro ao salvar o perfil. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPerfil();
  }, []);

  return (
    <div className={styles.container_perfil}>
      {loading && <Loading />}
      <h2>Perfil</h2>

      {perfil && (
        <form onSubmit={handleSubmit} className={styles.perfil}>
          <div className={styles.container_img}>
            <img
              src={BASE_URL + perfil.img_logo}
              alt="Foto de perfil"
              className={styles.img_logo}
            />

            <label htmlFor="img_logo" className={styles.label_img}>
              Imagem Logo
            </label>
            <input
              type="file"
              onChange={(e) => setNovaImgLogo(e.target.files[0])}
              className={styles.input_img}
            />
          </div>

          <div className={styles.info}>
            <Input
              id="nome_restaurante"
              label="Nome Restaurante:"
              type="text"
              name="nome_restaurante"
              value={perfil.nome_restaurante}
              onChange={handleInputChange}
              required
            />

            <Input
              id="nome_proprietario"
              label="Nome Proprietário:"
              type="text"
              name="nome_proprietario"
              value={perfil.nome_proprietario}
              onChange={handleInputChange}
              required
            />

            <Button nome="Salvar" type="submit" />
          </div>
        </form>
      )}
    </div>
  );
};

export default Perfil;

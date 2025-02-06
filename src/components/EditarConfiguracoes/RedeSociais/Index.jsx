import { useState } from "react";
import styles from "./RedeSociais.module.css";
import { useEffect } from "react";
import { apiService } from "../../../services/apiService";
import Loading from ".././../Loading/Index";
import Input from "../../ComponentesPequenos/Input/Index";
import Button from "../../ComponentesPequenos/Button/Index";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../services/alertService";

const RedeSociais = () => {
  const [redeSociais, setRedeSociais] = useState({
    tiktok: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
  });

  const [loading, setLoading] = useState(true);

  const getRedeSociais = async () => {
    setLoading(true);
    try {
      const res = await apiService.get("/rede_sociais");
      setRedeSociais(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRedeSociais((prevRedeSociais) => ({
      ...prevRedeSociais,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.put("/rede_sociais", redeSociais);
      showAlertSuccess("Redes sociais atualizadas com sucesso!");
      getRedeSociais();
    } catch (error) {
      showAlertError("Erro ao salvar as redes sociais. ", error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRedeSociais();
  }, []);

  return (
    <div className={styles.container_redesociais}>
      {loading && <Loading />}
      <h2>Redes Sociais</h2>
      <form onSubmit={handleSubmit} className={styles.redesociais}>
        {redeSociais && (
          <div className={styles.inputs}>
            <Input
              id="tiktok"
              label="TikTok"
              name="tiktok"
              value={redeSociais.tiktok}
              onChange={handleInputChange}
            />
            <Input
              id="facebook"
              label="Facebook"
              name="facebook"
              value={redeSociais.facebook}
              onChange={handleInputChange}
            />
            <Input
              id="instagram"
              label="Instagram"
              name="instagram"
              value={redeSociais.instagram}
              onChange={handleInputChange}
            />
            <Input
              id="whatsapp"
              label="WhatsApp"
              name="whatsapp"
              value={redeSociais.whatsapp}
              onChange={handleInputChange}
            />
          </div>
        )}
        <Button type="submit" nome="Salvar" />
      </form>
    </div>
  );
};

export default RedeSociais;

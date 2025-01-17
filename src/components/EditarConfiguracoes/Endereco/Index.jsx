import { useEffect, useState } from "react";
import styles from "./Endereco.module.css";
import { apiService, BASE_URL } from "../../../services/apiService";
import Input from "../../ComponentesPequenos/Input";
import Button from "../../ComponentesPequenos/Button";
import Loading from "../../Loading";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../services/alertService";

const Endereco = () => {
  const [endereco, setEndereco] = useState({
    img_restaurante: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    linkmaps: "",
  });
  const [novaImgRestaurante, setNovaImgRestauranteo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getEndereco = async () => {
    setLoading(true);
    try {
      const res = await apiService.get("/endereco");
      setEndereco(res);
      console.log(res);
    } catch (error) {
      console.error("Erro ao buscar o Endereco:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prevEndereco) => ({
      ...prevEndereco,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      if (novaImgRestaurante) {
        formData.append("img_restaurante", novaImgRestaurante);
      } else {
        formData.append("img_restaurante", endereco.img_restaurante);
      }
      formData.append("rua", endereco.rua);
      formData.append("bairro", endereco.bairro);
      formData.append("cidade", endereco.cidade);
      formData.append("estado", endereco.estado);
      formData.append("linkmaps", endereco.linkmaps);

      await apiService.put("/endereco", formData);
      showAlertSuccess("Endereco atualizado com sucesso!");
      getEndereco();
    } catch (error) {
      console.error("Erro ao salvar dados do Endereco:", error);
      showAlertError("Erro ao salvar dados do Endereco: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEndereco();
  }, []);

  return (
    <div className={styles.container_endereco}>
      {loading && <Loading />}
      <h2>Endereço</h2>
      <form onSubmit={handleSubmit} className={styles.content_form}>
        <div className={styles.content_img}>
          <img
            src={BASE_URL + endereco.img_restaurante}
            alt="Foto do Restaurante"
          />
          <input
            className={styles.input_img}
            type="file"
            onChange={(e) => setNovaImgRestauranteo(e.target.files[0])}
          />
        </div>

        <div className={styles.container_inputs}>
          <div className={styles.content_inputs}>
            <Input
              label="Rua"
              name="rua"
              value={endereco.rua}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Bairro"
              name="bairro"
              value={endereco.bairro}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Cidade"
              name="cidade"
              value={endereco.cidade}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Estado"
              name="estado"
              value={endereco.estado}
              onChange={handleInputChange}
              required
            />
          </div>

          <Input
            label="Link do Google Maps"
            name="linkmaps"
            value={endereco.linkmaps}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" nome="Salvar" background="#00be19" />
      </form>
    </div>
  );
};

export default Endereco;

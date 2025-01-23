import React from "react";
import styles from "./Localizacao.module.css";
import { BASE_URL } from "../../../services/apiService";
import img_instagram from "../../../assets/logos-icone/icone-instagram01.png";
import img_facebook from "../../../assets/logos-icone/icone-facebook01.png";
import img_tiktok from "../../../assets/logos-icone/icone-tiktok01.png";
import img_whatsapp from "../../../assets/logos-icone/icone-whatsapp01.png";
import img_localizacao from "../../../assets/logos-icone/localizacao.png";

const Localizacao = ({ endereco, rede_sociais }) => {
  return (
    <div className={styles.localizacaoContato}>
      <div className={styles.localizacaoTituloLogo}>
        <h2 className={styles.localizacaoTitulo}>Nossa Localização</h2>
        <img
          className={styles.localizacaoImg}
          src={img_localizacao}
          alt="Ícone de localização"
        />
      </div>

      <div className={styles.localizacao}>
        <div className={styles.localizacaoGoogle}>
          <iframe
            src={endereco.linkmaps}
            title="Mapa de Localização"
            className={styles.localizacaoMaps}
          ></iframe>
        </div>

        <div className={styles.contato}>
          <div className={styles.contatoImg}>
            <img
              src={BASE_URL + endereco.img_restaurante}
              alt="Foto da frente do restaurante"
              className={styles.contatoImgImagem}
            />
          </div>

          <div className={styles.contatoDescricao}>
            {
              <div className={styles.contatoDescricaoEndereco}>
                <h2>Nosso Endereço</h2>
                <p>
                  <strong>Rua:</strong> {endereco.rua}
                </p>
                <p>
                  <strong>Bairro: </strong>
                  {endereco.bairro}
                </p>
                <p>
                  <strong>Cidade:</strong> {endereco.cidade}
                </p>
                <p>
                  <strong>Estado:</strong> {endereco.estado}
                </p>
              </div>
            }

            <div className={styles.contatoDescricaoEntrarContato}>
              <h2>Entre em contato</h2>
              <ul className={styles.contatoDescricaoLinks}>
                {
                  <li>
                    <a
                      href={`https://wa.me/${rede_sociais.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={img_whatsapp}
                        className={styles.contatoImagemImg}
                        alt="Logo WhatsApp"
                      />
                    </a>
                  </li>
                }
                {
                  <li>
                    <a
                      href={`https://www.instagram.com/${rede_sociais.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={img_instagram}
                        className={styles.contatoImagemImg}
                        alt="Logo Instagram"
                      />
                    </a>
                  </li>
                }
                {
                  <li>
                    <a
                      href={`https://www.facebook.com/${rede_sociais.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={img_facebook}
                        className={styles.contatoImagemImg}
                        alt="Logo Facebook"
                      />
                    </a>
                  </li>
                }
                {
                  <li>
                    <a
                      href={`https://www.tiktok.com/${rede_sociais.tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={img_tiktok}
                        className={styles.contatoImagemImg}
                        alt="Logo TikTok"
                      />
                    </a>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localizacao;

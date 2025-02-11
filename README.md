# Pedidooon Front-End

Um sistema de gerenciamento de pedidos com interface intuitiva e funcionalidades para autenticação, gerenciamento de cardápio, promoções e muito mais.

## Sobre o Projeto

O **Pedidooon Front-End** é a interface do sistema de pedidos, desenvolvido em **React** e utilizando **Vite** para um ambiente de desenvolvimento rápido e eficiente. Conta com:

- Autenticação de usuários com **Context API**.
- Navegação protegida com **React Router**.
- Gerenciamento de cardápio, promoções e pedidos.
- Design responsivo e interativo com **Swiper** e **React Icons**.
- Requisições HTTP utilizando **Axios**.
- Alertas personalizados com **SweetAlert2**.

## Instalação

1. Certifique-se de ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados.
2. Clone este repositório:

   ```bash
   git clone https://github.com/felipesantana012/pedidoon-front.git
   ```

3. Acesse o diretório do projeto:
   ```bash
   cd front-end-pedidoon
   ```
4. Instale as dependências:
   ```bash
   npm install
   ```

## Dependências

### Principais

- **react**: Biblioteca principal para construção da interface.
- **react-router-dom**: Gerenciamento de rotas e navegação.
- **axios**: Requisições HTTP para comunicação com a API.
- **react-scroll**: Rolagem suave entre seções.
- **react-icons**: Ícones personalizados.
- **swiper**: Carrossel interativo.
- **sweetalert2**: Alertas personalizados.

### Desenvolvimento

- **vite**: Build rápido e eficiente.
- **eslint**: Padronização do código.
- **@vitejs/plugin-react**: Suporte ao React no Vite.

## Scripts Disponíveis

No `package.json`, estão configurados os seguintes scripts:

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Gera a versão otimizada para produção.

## Estrutura de Pastas

```
├── src
│   ├── components
│   ├── contexts
│   ├── pages
│   ├── routes
│   ├── services
│   ├── styles
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public
├── .eslintrc.json
├── package.json
├── vite.config.js
└── README.md
```

- **`components`**: Componentes reutilizáveis da aplicação.
- **`contexts`**: Gerenciamento de estado global, como autenticação.
- **`pages`**: Páginas principais do sistema.
- **`routes`**: Configuração das rotas e proteções.
- **`services`**: Serviços de comunicação com a API.
- **`styles`**: Estilos globais e variáveis CSS.
- **`App.jsx`**: Componente raiz da aplicação.
- **`main.jsx`**: Ponto de entrada do React.

## Uso

1. Para iniciar o servidor de desenvolvimento, execute:
   ```bash
   npm run dev
   ```
2. O front-end estará disponível em `http://localhost:5173`.

3. Front-end ja esta disponivel na web :

- Verção Restaurante ADM : https://pedidoon.felipedev.app.br/
- Verção Cliente : https://pedidoon.felipedev.app.br/restaurante/site_teste

## Acesso

- email: felipe@gmail.com
- senha: 1234

# 💻 MOTORSHOP

Projeto desenvolvido por alunos da KenzieAcademy como requisito de conclusão do M6. O projeto consiste em um e-commerce de carros onde o usuário pode atuar como vendedor ou comprador.

O grupo foi composto por:
Douglas Diniz
Edson Kokado
Fernanda Bollinger
Lilian Dias
Samir Dourado

OBS: Esse projeto foi criado com Next.js(13.4.4) a partir do comando [`create-next-app`]

## 🎲 Utilizando projeto

### ▪️ Baixando projeto e instalando dependências

Para utilizar o projeto basta fazer o fork do repositório em computador e ao baixar realizar o download das dependências do site com o comando:
`yarn install`
ou
`npm install`
ou
`pnpm install`

### ▪️ Iniciando visualização do projeto

Ao finalizar o download das dependências, inicie a visualização do projeto em ambiente de desenvolvimento com o comando:

`yarn dev`
ou
`npm run dev`
ou
`pnpm dev`

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

---

### ▪️ Bibliotecas utilizadas

-Chakra UI -
+chakra-ui/icons(2.0.19)
+chakra-ui/next-js(2.1.4)
+chakra-ui/react(2.7.0)
+chakra-ui/toast(6.1.4)
+chakra-ui-autocomplete(1.4.5)

-emotion
+emotion/react(11.11.0)
+emotion/styled(11.11.0)

-hookform/resolvers(3.1.0)
-axios(1.4.0)
-framer-motion(10.12.16)
-jwt-decode(3.1.2)
-nookies(2.5.2)
-react-icons(4.9.0)
-react-toastify(9.1.3)
-typescript(5.0.4)
-zod(3.21.4)

---

## 🗂 Estrutura de pastas

Todas as pastas são comuns de um projeto Next, porém alguns arquivos precisam de atenção especial.

Segue as informações sobre cada um:

🗂 Pasta styles

Nessa pasta você encontrará o arquivo que customiza o estilo principal do site. Toda componetização foi feita através do Chakra UI. Para acrescentar ou modificar o estilo siga a documentação [https://chakra-ui.com/getting-started]

🗂 Pasta util

Nessa pasta você encontrará 2 arquivos. Um conversor de string para número e um com um componente para proteção de rotas.

🗂 Pasta service

Nessa pasta você encontrará as rotas das apis usadas nesse projeto. Caso queira trabalhar com uma api em sua máquina, você deve modificar o a variável api para apontar para rota que leva a api local.

         exemplo:
         `export const api = axios.create({
         baseURL: 'http://localhost:<minha porta>',
         timeout: 8000
         })`

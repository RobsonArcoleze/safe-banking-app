
# safe-banking-app
Safe Banking é um projeto desenvolvido usando Angular 16 e node 18. Consiste em aplicação de agendamento de transferência bancária e taxação de acordo com a data informada pelo cliente.

- **YOUTUBE** - Video explicativo: [Safe-Bank](https://youtu.be/TRtNo_0U-K4)
- OBS: Este projeto roda juntamento com uma aplicação em Java com Spring neste [LINK](https://github.com/RobsonArcoleze/safe-banking-api)

## Arquitetura

A arquitetura da aplicação é baseada em **Componentes e Serviços** seguindo as melhores práticas do Angular. A ideia principal é garantir uma estrutura modular, fácil de escalar e testar, com foco na separação de responsabilidades.

### Componentes

Os componentes são responsáveis pela interface de usuário, utilizando a biblioteca **PrimeNG** para fornecer componentes visuais ricos e interativos, como tabelas, gráficos, formulários, entre outros.

### Serviços

Os serviços são responsáveis pela comunicação com o backend (Node.js). Eles utilizam **HttpClientModule** para consumir APIs RESTful, garantindo a separação das preocupações e a reutilização do código.

### Módulos

Os módulos ajudam a organizar a aplicação em partes coesas e reutilizáveis. Cada módulo encapsula uma funcionalidade específica, o que facilita a manutenção e a escalabilidade da aplicação.

## Ferramentas Utilizadas

- **Angular 16:** Framework principal para a construção da aplicação front-end.
- **PrimeNG:** Biblioteca de componentes UI rica, que oferece diversos elementos de interface como tabelas, gráficos, menus, e muito mais.
- **Node.js 18:** Ambiente de execução JavaScript utilizado para o desenvolvimento do backend e gerenciamento do projeto.
- **npm (Node Package Manager):** Gerenciador de pacotes utilizado para instalar dependências.
- **TypeScript:** Linguagem de programação que adiciona tipagem estática ao JavaScript, utilizada no desenvolvimento da aplicação.
- **RxJS:** Biblioteca para programação reativa com observáveis, muito utilizada no Angular para lidar com streams de dados assíncronos.

## Como Usar a Aplicação

### Clonando o Repositório

Para clonar o repositório e executar a aplicação localmente, siga os seguintes passos:

1. Clone o repositório:
   ```bash
   git@github.com:RobsonArcoleze/safe-banking-app.git
    cd safe-banking-app
   
2. Instale as dependencias
   ```bash
   npm i
   npm start
   http://localhost:4200

3. Usando o Docker
   ```bash
   docker build -t robsonarcoleze/safe-banking-app:latest .
    docker run -p 80:80 nome-da-imagem

---
## Docker

A aplicação foi configurada para rodar em containers Docker, facilitando a execução em qualquer ambiente. O Dockerfile está presente no repositório e permite a construção de uma imagem Docker da aplicação.

### Dockerfile

```dockerfile
# Etapa 1: Construção da aplicação Angular
FROM node:18 AS build

WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build otimizado para produção
RUN npm run build --configuration=production

# Etapa 2: Configuração do Nginx para servir a aplicação
FROM nginx:alpine

# Remove arquivos padrão do Nginx e copia o build do Angular
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/safe-banking-app /usr/share/nginx/html

# Copia o arquivo de configuração personalizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]


```
---
## Pipeline

A aplicação inclui uma pipeline para testes e deploy. A pipeline executa os seguintes passos:

- **Build:** Compila o código e gera o arquivo .jar.
- **Deploy:** Realiza o deploy da imagem no DockerHub
---


## Autor
Robson Arcoleze
[Linkedin](https://www.linkedin.com/in/robsonarcoleze/)

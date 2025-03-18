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

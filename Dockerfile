FROM node:18-alpine

WORKDIR /home/app

COPY package.json .
COPY tsconfig.json .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 8080

CMD ["pnpm", "serve"]

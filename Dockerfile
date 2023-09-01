FROM node:18-alpine

WORKDIR /home/app

COPY package.json .
COPY vite.config.ts .
COPY tsconfig.json .
COPY tsconfig.node.json .

RUN npm install -g @vue/cli
RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "start"]

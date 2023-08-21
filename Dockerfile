FROM node:14.10.1
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]

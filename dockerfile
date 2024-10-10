FROM node:latest


WORKDIR /app


COPY package*.json ./

# Install dependencies use npm ci instead of npm install
RUN npm ci

# Copy app code into container
COPY . .

# access port 3000
EXPOSE 3000

# NPM run dev to start the server
CMD ["npm", "run", "dev"]

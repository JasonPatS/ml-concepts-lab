# Image for the frontend's Vite dev server, used by Docker Compose.
FROM node:24-slim

WORKDIR /app

# Install dependencies before copying the code: Docker saves the result of this
# step and reuses it until the lockfile changes, so rebuilds are fast.
# npm ci installs exactly what package-lock.json lists.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5173

# --host 0.0.0.0 makes the dev server reachable from outside the container.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

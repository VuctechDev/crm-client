# Step 1: Use the official Node.js image as a base image
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the app
RUN npm run build

# Step 2: Use a lightweight web server to serve the built app
FROM nginx:alpine

# Copy built app from previous stage to Nginx's web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx will serve on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

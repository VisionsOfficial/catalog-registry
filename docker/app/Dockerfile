# Use the official Node.js image as base image
FROM node:lts

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Command to run the application
CMD sh -c "pnpm run db:init && pnpm run build && pnpm run start"

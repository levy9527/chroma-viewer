# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock build/ .

# Install dependencies
RUN yarn --production

# Expose the desired port 
EXPOSE 3000

# Start the app
CMD [ "node", "index.js" ]

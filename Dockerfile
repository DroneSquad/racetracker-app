FROM node:8.0.0

# Defaults to setting up the dev env
EXPOSE 3000
CMD ["yarn", "start"]

WORKDIR /opt/mobile

# Copy everything needed to build the application, exclude files in .dockerignore
COPY . .

# Install all the packages
RUN yarn setup

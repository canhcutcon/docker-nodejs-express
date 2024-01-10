FROM debian:12.1-slim

# Path: Dockerfile
# Install necessary packages
USER root
RUN apt-get update && apt-get install -y \
    curl \
    git \
    gnupg \
    unzip \
    wget \
    zip \
    && rm -rf /var/lib/apt/lists/*

# Add nodejs repository
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

# Install nodejs
RUN apt-get update && apt-get install -y \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

# Add yarn repository
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list

# Install yarn
RUN apt-get update && apt-get install -y \
    yarn \
    && rm -rf /var/lib/apt/lists/*


#Copy the application
COPY package.json /
COPY yarn.lock /
COPY .env /

# Install dependencies
RUN yarn install

# Copy the application
COPY server /server
COPY .env /server
COPY database /database
COPY config /config

RUN chown -R root:root /server
RUN chown -R root:root /database
RUN chown -R root:root /config

RUN chmod -R 755 /server
RUN chmod -R 755 /database
RUN chmod -R 755 /config

# Expose the port
EXPOSE 3000

# Run the application
CMD ["yarn", "dev"]
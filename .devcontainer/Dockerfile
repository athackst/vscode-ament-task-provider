# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.177.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# Install VSCode extension development packages
RUN su node -c "npm install -g yo generator-code vsce"

# Install git aliases
RUN wget -O /etc/profile.d/git_aliases.sh https://github.com/athackst/workstation_setup/raw/main/user/.aliases/git_aliases.sh \
   && echo "source /etc/profile.d/git_aliases.sh" >> /home/node/.bashrc

# Install docker
RUN curl -sSL https://get.docker.com/ | sh

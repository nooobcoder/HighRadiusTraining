# Copyright (c) 2021 Tailscale Inc & AUTHORS All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

FROM gitpod/workspace-full:latest

USER root

RUN curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/focal.gpg | sudo apt-key add - \
     && curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/focal.list | sudo tee /etc/apt/sources.list.d/tailscale.list \
     && apt-get update \
     && apt-get install -y tailscale

USER gitpod
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
ENV SHELL=zsh
RUN echo "alias gits='git status'" >> $HOME/.zshrc
RUN echo "alias ls='ls -GFh'" >> $HOME/.zshrc
ENV NVM_DIR="$HOME/.nvm"
RUN echo ". ~/.nvm/nvm.sh" >> $HOME/.zshrc
RUN sed -i 's/plugins=(git)/plugins=(git npm docker-compose docker)/' $HOME/.zshrc
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
RUN sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="powerlevel10k\/powerlevel10k"/' $HOME/.zshrc
RUN wget https://gist.githubusercontent.com/nooobcoder/d8f728b999329c4edf563cd378d0398c/raw/.p10k.zsh -O $HOME/.p10k.zsh
RUN echo "[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh" >> $HOME/.zshrc

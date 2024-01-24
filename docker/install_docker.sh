#!/bin/bash

# Установка зависимостей
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Добавление ключа GPG для официального репозитория Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Добавление официального репозитория Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установка Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Добавление текущего пользователя в группу docker для выполнения Docker без sudo
sudo usermod -aG docker $USER

# Запуск службы Docker
sudo systemctl start docker
sudo systemctl enable docker

# Проверка установки Docker
docker --version
#!/bin/bash

# Nombre de la red
NETWORK_NAME="dapp_network"

echo ">>>>>>> Deteniendo y eliminando contenedores, imágenes y volúmenes..."
docker-compose down --rmi all --volumes --remove-orphans

echo ">>>>>>> Verificando red $NETWORK_NAME..."
docker network inspect $NETWORK_NAME >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo ">>>>>>> Red $NETWORK_NAME no encontrada. Creando..."
  docker network create --driver bridge $NETWORK_NAME
else
  echo ">>>>>>> Red $NETWORK_NAME ya existe."
fi

echo ">>>>>>> Levantando contenedores..."
docker-compose up -d

echo ">>>>>>> Conectando contenedores a la red $NETWORK_NAME..."

for container in $(docker ps --format "{{.Names}}"); do
  docker network connect $NETWORK_NAME $container 2>/dev/null || true
done

echo ">>>>>>> Verificando conexiones a la red $NETWORK_NAME..."
docker network inspect $NETWORK_NAME

echo ">>>>>>> Todo listo. ¡Sistema en ejecución!"

#!/bin/sh

# Esperar a que MySQL esté listo en el puerto 3306
echo "⏳ Esperando a que MySQL esté disponible..."
until nc -z -v -w30 mysql-dapp-container 3306; do
  echo "MySQL no está disponible, reintentando en 5 segundos..."
  sleep 5
done

echo "✅ MySQL está disponible, aplicando migraciones..."
npx prisma migrate deploy

echo "🌱 Ejecutando seed..."
npx ts-node ./prisma/seed/seed.ts

echo "🚀 Iniciando la aplicación en modo producción..."
npm run start:prod

#!/bin/bash

# Crear el directorio scripts si no existe
mkdir -p $(dirname "$0")

echo "Iniciando contenedor de PostgreSQL..."
docker-compose up -d

echo "Esperando a que PostgreSQL esté listo..."
sleep 5

echo "Generando cliente Prisma..."
npx prisma generate

echo "Aplicando esquema de base de datos..."
npx prisma db push

echo "Configuración completada. La base de datos está lista para usar." 
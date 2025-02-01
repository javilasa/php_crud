# Proyecto PHP con DDEV

Este proyecto utiliza **DDEV** como entorno de desarrollo y **Composer** para la gestión de dependencias.

##  Requisitos
Antes de empezar, asegúrate de tener instalado:
- [Docker](https://www.docker.com/)
- [DDEV](https://ddev.readthedocs.io/en/stable/#installation)
- [Composer](https://getcomposer.org/)

## Descargar proyecto
git clone https://github.com/javilasa/php_crud.git

## Como iniciar el proyecto
Desde la raíz del proyecto, ejecuta:

ddev start

## Instalar dependencias

ddev composer install

## Importar la base de datos

ddev import-db --src=database.sql


## Configuración Adicional
## La configuración se encuentra en  .env
DB_HOST=db
DB_PORT=3306
DB_DATABASE=db
DB_USERNAME=db
DB_PASSWORD=db

# URL de login
http://phptest.ddev.site/login

# Credenciales de Inicio

email: ja_avila@hotmail.com
pasword: 1234

## Consultar la base de datos

ddev mysql




# Investigación: uso de dotenv en Node.js

Este documento forma parte de la práctica CRUD de Tareas y Usuarios con Sequelize. Responde cuatro preguntas: qué es dotenv, cómo se instala, cómo se configura y cómo se leen las variables desde el código. Al final muestra el ejemplo aplicado a este proyecto.

## 1. Qué es dotenv

dotenv es un módulo de Node.js que no necesita otras dependencias. Lee un archivo llamado `.env` y copia sus valores en `process.env`. `process.env` es el objeto de Node.js donde se guardan las variables de entorno del programa.

Una variable de entorno es un dato de configuración que está fuera del código. Por ejemplo, el usuario y la clave de la base de datos. Guardarlos aparte permite cambiarlos sin tocar el código. También evita subir datos privados a GitHub.

dotenv se basa en la metodología The Twelve-Factor App. Esta metodología propone guardar la configuración en el entorno, separada del código.

Fuente: README oficial de dotenv, párrafo de introducción.

## 2. Cómo se instala

Se instala con npm, desde la carpeta del proyecto:

```
npm install dotenv --save
```

Después de la instalación, dotenv queda registrado en `dependencies` dentro de `package.json`. Este proyecto declara la versión `^18.0.5`.

Fuente: README oficial de dotenv, sección Usage.

## 3. Cómo se configura

La configuración tiene dos pasos.

Primer paso: crear el archivo `.env` en la raíz del proyecto, junto a `package.json`. Cada variable va en una línea, con la forma `NOMBRE=VALOR`. Las líneas vacías se ignoran. Las líneas que empiezan con `#` son comentarios. Un valor vacío, como `DB_PASSWORD=`, se lee como un texto vacío.

Segundo paso: cargar dotenv lo antes posible en la aplicación. Con módulos ES (`import` y `export`), se hace así:

```
import dotenv from "dotenv";

dotenv.config();
```

También existe una forma corta, `import "dotenv/config";`. Esa forma no permite pasar opciones.

Por defecto, dotenv busca el archivo `.env` en la carpeta desde donde se ejecuta Node. Por eso conviene ejecutar `node app.js` desde la raíz del proyecto.

La función `config` acepta estas opciones:

- `path`: indica la ruta del archivo, si no está en la carpeta actual.
- `quiet`: con el valor `true`, oculta el mensaje que dotenv imprime al cargar. Por defecto es `false`.
- `debug`: con el valor `true`, muestra mensajes que ayudan a saber por qué una variable no se cargó.
- `override`: con el valor `true`, los valores del `.env` reemplazan a las variables que ya existían.

Un ejemplo con una opción:

```
dotenv.config({ quiet: true });
```

Hay dos reglas que conviene conocer.

La primera: dotenv no modifica las variables que ya estaban definidas en el sistema. Si una variable del `.env` tiene el mismo nombre que una existente, se mantiene la existente. Esto cambia solo si se usa `override`.

La segunda: en un archivo con `import`, todos los `import` se ejecutan antes que el resto del código. Por eso, si un módulo importado lee `process.env` al cargarse, un `dotenv.config()` escrito después de los `import` llega tarde. La solución es llamar a `dotenv.config()` en el mismo archivo que lee las variables, antes de usarlas.

Fuente: README oficial de dotenv, secciones Usage, Advanced (ES6), Docs (Config y sus opciones) y FAQ (preguntas "How do I use dotenv with import?", "What happens to environment variables that were already set?" y "What rules does the parsing engine follow?").

## 4. Cómo se accede a las variables

Después de ejecutar `dotenv.config()`, cada variable del `.env` es una propiedad de `process.env`. Se lee con `process.env.NOMBRE`.

Por ejemplo, con la línea `DB_NAME=tasks_users_db` en el `.env`, la expresión `process.env.DB_NAME` devuelve `tasks_users_db`.

Fuente: README oficial de dotenv, sección Usage.

## 5. Ejemplo aplicado a este proyecto

El proyecto usa cinco variables: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST` y `PORT`.

### Archivo .env.example

Este archivo sí se sube a GitHub. Contiene los nombres de las variables, sin datos privados:

```
DB_NAME=tasks_users_db
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
PORT=3000
```

Quien clone el proyecto copia `.env.example` con el nombre `.env` y completa sus propios valores.

### Archivo .env

Tiene el mismo formato, pero con los valores reales de cada computadora. Este archivo no se sube a GitHub. El archivo `.gitignore` lo excluye:

```
node_modules/
.env
```

La documentación de dotenv indica que el archivo `.env` no debe subirse al repositorio.

### Archivo src/config/database.js

Este archivo carga el `.env` y luego lee cuatro variables para conectarse a MySQL. Así el usuario y la clave no están escritos en el código:

```
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
);

export default sequelize;
```

Como `dotenv.config()` está en el mismo archivo y antes de leer `process.env`, las variables ya existen cuando se crea la conexión.

### Archivo app.js

Este archivo usa la variable `PORT` para elegir el puerto del servidor:

```
dotenv.config();

const PORT = process.env.PORT || 3000;
```

Si `PORT` no existe, el servidor usa el puerto 3000.

### Mensajes que aparecen en la consola

Al ejecutar `node app.js`, la consola muestra dos mensajes de dotenv:

```
injected env (5) from .env
injected env (0) from .env
```

El primero viene de `database.js`, que carga las cinco variables. El segundo viene de `app.js`, que llama otra vez a `config()` y no encuentra variables nuevas, porque ya estaban cargadas. El `(0)` no indica un error. Para ocultar estos mensajes se usa la opción `quiet: true`.

Fuente: README oficial de dotenv, sección Usage (formato del mensaje `injected env`) y sección Docs, opción `quiet`. Los archivos del ejemplo son los de este proyecto.

## 6. Resumen

- dotenv carga las variables del archivo `.env` en `process.env`.
- Se instala con `npm install dotenv --save`.
- Se configura con un archivo `.env` y la llamada `dotenv.config()`.
- Se leen con `process.env.NOMBRE`.
- El archivo `.env` no se sube a GitHub. El archivo `.env.example` sí.

## Fuentes

1. motdotla. dotenv (README oficial). GitHub. https://github.com/motdotla/dotenv. Consultado el 6 de octubre de 2026.
   - Introducción: qué es dotenv y su base en The Twelve-Factor App.
   - Usage: instalación, formato del `.env`, carga y lectura de variables, mensaje `injected env`.
   - Advanced (ES6): uso con `import`.
   - Docs, Config, Options: `path`, `quiet`, `debug` y `override`.
   - FAQ: no subir el `.env`, orden de los `import`, variables ya definidas y reglas de lectura del archivo.
2. Archivos de este proyecto: `.env.example`, `.gitignore`, `package.json`, `src/config/database.js` y `app.js`.
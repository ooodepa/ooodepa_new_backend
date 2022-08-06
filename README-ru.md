# README

**Языки документации**:

- [English](README.md)
- [Русский](README-ru.md)

**Меню**:

- [Задание](#задание)
- [Как запустить приложение](#как-запустить-приложение)
- [Стэк приложений](#стэк-приложений)
- [Структура проекта](#структура-проекта)

## Задание

Написать бэкэнд

## Как запустить приложение

```bash
git clone https://github.com/ooodepa/ooodepa_new_backend.git
#git clone git@github.com:ooodepa/ooodepa_new_backend.git
cd ooodepa_new_backend
```

### Разработка

Терминал 1 (старт базы данных):

```bash
cp .env.example .env
# copy .env.example .env
docker-compose -f docker-compose.dev.yml up
# docker-compose -f docker-compose.dev.yml down -v
```

Терминал 2 (старт NodeJS):

```bash
npm ci
cp .env.example .env
# copy .env.example .env
npm run dev
# npm i -g sequelize-cli
#sequelize db:drop
#sequelize db:create
sequelize db:migrate
```

### Продакшен

```bash
cp .env.example .env
# copy .env.example .env
docker-compose -f docker-compose.prod.yml up
# docker-compose -f docker-compose.prod.yml down -v
```

## Стэк приложений

- **[Firefox](https://www.mozilla.org/en-US/firefox/enterprise/)** - браузер
- **[VS Code](https://code.visualstudio.com/#alt-downloads)** - редактор кода
- **[Node JS](https://nodejs.org/en/)** - для разработки приложения
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - для хэширования
    пароля
  - [cors](https://github.com/expressjs/cors) - убрать CORS в браузере
  - [dotenv](https://github.com/motdotla/dotenv) - для использования ENV
  - [express](https://github.com/expressjs/express) - фреймворк для REST
  - [express-validator](https://express-validator.github.io/docs/) - проверка
    параметров REST
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - для генерации
    JWT
  - [mysql2](https://github.com/sidorares/node-mysql2) - для работы с БД
  - [redoc-express](https://github.com/AungMyoKyaw/redoc-express) - для
    генерации страницы REDOC из JSON
  - [sequelize](https://sequelize.org/docs/v6/getting-started/) - для работы с
    БД без SQL
  - [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) - чтобы писать
    Swagger в комментариях JavaScript
  - [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) -
    для генерации страницы Swagger из JSON
  - [uuid](https://github.com/uuidjs/uuid) - для генерации уникального id
- **[Docker, docker-compose](https://www.docker.com/get-started/)** - контейнеры
- **[MySQL Workbench](https://www.mysql.com/products/workbench/)** - просмотр БД

## Структура проекта

```bash
sudo apt install tree
tree --charset ascii -a -I ".git|docker|node_modules"
```

```
.
|-- .dockerignore
|-- .env
|-- .env.example
|-- .eslintrc.js
|-- .gitignore
|-- .prettierignore
|-- .prettierrc.json
|-- Dockerfile
|-- LICENSE
|-- README-ru.md
|-- README.md
|-- app.js
|-- config
|   |-- app.settings.js
|   |-- app.swagger.settings.js
|   `-- config.js
|-- docker-build.sh
|-- docker-compose.dev.yml
|-- docker-compose.prod.yml
|-- docker-compose.yml
|-- migrations
|   |-- 20220802142913-create-rb-user.js
|   |-- 20220802155259-create-rb-contact.js
|   |-- 20220802155501-create-rb-contact-type.js
|   `-- 20220802155735-create-tp-conctact-contact-type.js
|-- models
|   |-- index.js
|   |-- rb_contact.js
|   |-- rb_contacttype.js
|   |-- rb_user.js
|   `-- tp_conctact_contacttype.js
|-- package-lock.json
|-- package.json
|-- routes
|   |-- auth.js
|   |-- contact-types.js
|   |-- contacts.js
|   |-- redoc.js
|   |-- swagger.js
|   `-- swagger.json.js
|-- scripts
|   |-- MiddlewareTokenCheck.js
|   `-- MiddlewareTypeCheck.js
`-- seeders

6 directories, 38 files
```

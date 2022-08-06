# README

**Documentation languages**:

- [English](README.md)
- [Русский](README-ru.md)

**Menu**:

- [Task](#task)
- [How to run app](#how-to-run-app)
- [Application stack](#application-stack)
- [Project structure](#project-structure)

## Task

Write backend

## How to run app

```bash
git clone https://github.com/ooodepa/ooodepa_new_backend.git
#git clone git@github.com:ooodepa/ooodepa_new_backend.git
cd ooodepa_new_backend
```

### Development

Terminal 1 (start Database):

```bash
cp .env.example .env
# copy .env.example .env
docker-compose -f docker-compose.dev.yml up
# docker-compose -f docker-compose.dev.yml down -v
```

Terminal 2 (start NodeJS):

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

### Production

```bash
cp .env.example .env
# copy .env.example .env
docker-compose -f docker-compose.prod.yml up
# docker-compose -f docker-compose.prod.yml down -v
```

## Application stack

- **[Firefox](https://www.mozilla.org/en-US/firefox/enterprise/)** - browser
- **[VS Code](https://code.visualstudio.com/#alt-downloads)** - code editor
- **[Node JS](https://nodejs.org/en/)** - for application development
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - for password hashing
  - [cors](https://github.com/expressjs/cors) - remove CORS in the browser
  - [dotenv](https://github.com/motdotla/dotenv) - for using ENV
  - [express](https://github.com/expressjs/express) - a framework for REST
  - [express-validator](https://express-validator.github.io/docs/) - check REST
    parameters
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - to generate JWT
  - [mysql2](https://github.com/sidorares/node-mysql2) - for working with the
    database
  - [redoc-express](https://github.com/AungMyoKyaw/redoc-express) - to generate
    a REDOC page from JSON
  - [sequelize](https://sequelize.org/docs/v6/getting-started/) - for working
    with Database without SQL
  - [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) - to write Swagger
    in JavaScript comments
  - [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - to
    generate a Swagger page from JSON
- **[Docker, docker-compose](https://www.docker.com/get-started/)** - continers
- **[MySQL Workbench](https://www.mysql.com/products/workbench/)** - view DB

## Project structure

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

# README

**Documentation languages**:

- [English](README.md)
- [Русский](README-ru.md)

**Menu**:

- [Task](#task)
- [How to run app](#how-to-run-app)
- [Application stack](#application-stack)
- [Folder structure](#folder-structure)

## Task

...

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
docker-compose -f docker-compose.database.yml up
# docker-compose -f docker-compose.database.yml down -v
```

Terminal 2 (start NodeJS):

```bash
npm ci
cp .env.example .env
# copy .env.example .env
npm run dev
```

### Production

```bash
cp .env.example .env
# copy .env.example .env
docker-compose -f docker-compose.prod.yml up
# docker-compose -f docker-compose.prod.yml down -v
```

## Application stack

- **[VS Code](https://code.visualstudio.com/#alt-downloads)** - code editor
- **[Node JS](https://nodejs.org/en/)** - for application development
- **[Firefox](https://www.mozilla.org/en-US/firefox/enterprise/)** - browser
- **[Docker, docker-compose](https://www.docker.com/get-started/)** - continers
- **[MySQL Workbench](https://www.mysql.com/products/workbench/)** - view DB

## Folder structure

```bash
sudo apt install tree
tree --charset ascii -I "node_modules|docker" -d
```

```
.
|-- config
|-- migrations
|-- models
|-- routes
|   |-- redoc
|   |-- swagger
|   `-- swagger.json
`-- seeders

8 directories
```

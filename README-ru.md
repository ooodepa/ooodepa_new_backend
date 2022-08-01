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

...

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
docker-compose -f docker-compose.database.yml up
# docker-compose -f docker-compose.database.yml down -v
```

Терминал 2 (старт NodeJS):

```bash
npm ci
cp .env.example .env
# copy .env.example .env
npm run dev
```

### Продакшен

```bash
cp .env.example .env
# copy .env.example .env
docker-compose -f docker-compose.prod.yml up
# docker-compose -f docker-compose.prod.yml down -v
```

## Стэк приложений

- **[VS Code](https://code.visualstudio.com/#alt-downloads)** - редактор кода
- **[Node JS](https://nodejs.org/en/)** - для разработки приложения
- **[Firefox](https://www.mozilla.org/en-US/firefox/enterprise/)** - браузер
- **[Docker, docker-compose](https://www.docker.com/get-started/)** - контейнеры
- **[MySQL Workbench](https://www.mysql.com/products/workbench/)** - просмотр БД

## Структура проекта

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

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
npm ci
cp .env.example .env
npm run dev
```

## Стэк приложений

- **[VS Code](https://code.visualstudio.com/#alt-downloads)** - редактор кода
- **[Node JS](https://nodejs.org/en/)** - для разработки приложения
- **[Firefox](https://www.mozilla.org/en-US/firefox/enterprise/)** - браузер

## Структура проекта

```bash
sudo apt install tree
tree --charset ascii -I "node_modules|build" -d
```

```
.
`-- src
    |-- consts
    `-- routes
        |-- hello
        |   `-- GET
        |-- redoc
        |   `-- GET
        |-- swagger
        |   `-- GET
        `-- swagger.json
            `-- GET

11 directories
```

- **consts**:
  - **Описание**: папка с константами
  - **Виды файлов**:
    - `*.js`
- **scripts**:
  - **Описание**: папка с роутами
  - **Виды файлов**:
    - `*.js`

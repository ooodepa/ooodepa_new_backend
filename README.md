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
npm ci
cp .env.example .env
npm run dev
```

## Application stack

- **[VS Code](https://code.visualstudio.com/#alt-downloads)** - code editor
- **[Node JS](https://nodejs.org/en/)** - for application development
- **[Firefox](https://www.mozilla.org/en-US/firefox/enterprise/)** - browser

## Folder structure

```bash
sudo apt install tree
tree --charset ascii -I "node_modules" -d
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
  - **Description**: folder with constants
  - **Types of files**:
    - `*.js`
- **routes**:
  - **Description**: A folder with routes
  - **Types of files**:
    - `*.js`

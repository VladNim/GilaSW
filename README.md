# Gila Software

## Notifications system

### Requirements

- Docker
- Git
- (Optional) Node 

Node is only required for running the backend and/or frontend without using Docker.

### Installation

Cloning the repo:

```
git clone <repo>
```

The next step is to create your environment files under the `<root>/backend` directory:

```
<root>/backend/.env
<root>/backend/.env.test
```

`.env`
```
NODE_ENV=development
PORT=3000

POSTGRES_DB=<database_name>
POSTGRES_USER=<database_user>
POSTGRES_PASSWORD=<database_password>
POSTGRES_HOST=localhost
POSTGRES_DB_PORT=5432
```
> The `.env` file defines the database credentials for the Rest API

`.env.test`
```
POSTGRES_DB=giladb_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_HOST=localhost
POSTGRES_DB_PORT=5433
```
> The `.env.test` file defines the database connectionns for Jest (Unit Tests)

#### Dockerized installation

For running backend, frontend and database in Docker
```sh
docker compose up -d
```

#### Running backend using npm

> Note: Requires a postgresql instance running we included a `compose-postgresql.yaml` file for setting up postgresql in a Docker container

(Optional) if you don't have a postgresql instance running.

```
docker compose -f compose-postgresql.yaml up -d
```

***Tip:*** you can also use the command `docker compose up -d` and keep running only the `postgres-1` service (you can stop the `backend-1` service).

Once you have your postgresql instance running you need to:

```
cd <root>/backend
npm install
npm run dev
```

### Migrations

You can create new migration files using the next command:

```
npm run migration:create
```

This will cretae a new file under the `<root>/src/database/migrations` directory.

The migrations up are autmatically executed by the ORM, you don't need to run them manually, you just need to re-run your environment re building your Docker container:
```
docker build
docker compose up -d
```

or restarting you npm run process:
```
<cdm + c>
npm run dev
```

### Factory and Seeder

For creating fake users you can enable the ```MOCK_USERS```as true inside your .env file.
This will create 20 User entities for your current environment.

> This flag will be ignored if you already have any User created, this for avoiding to override or loose control over the "real" Users and the fake ones.

```
...
MOCK_USERS=true
...
```

### Unit Tests

If you didn't install the project using the **Dockerized installation** you would need to create the Testing Database manually by yourself or using the `compose-postgresql-test.yaml`:

```
docker compose -f compose-postgresql-test.yaml up -d
```

You can run your Unit Tests with the following command:

```
npm run test
```

Remember to install the packages if you didn't yet before running the command above:

```
npm install
```

### Database Diagrams

Under the directory `<root>/docs` you will find the file: `db-diagram.dbdiagram`.
This file contains the design for the ERD and can be opened on [dbdiagram.io](https://dbdiagram.io/)
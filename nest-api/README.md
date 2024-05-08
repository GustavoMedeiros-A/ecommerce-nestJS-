## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# Now start the main project

- Add de module products with **nest g resource**
- Add the ORM lib and mysql with **yarn add typeorm @nestjs/typeorm mysql2**

# Create the docker compose to UP mysql db

Run the follow commands to verify if works

- **docker compose exec db bash**
- **mysql -uroot -proot**
- **show databases;**

# Create a FIXTURE to generate data to test the application

- **Create the fixture.ts**
- **Add the fixture generate in package.json**
- **"fixture": "ts-node ./src/fixture.ts"**

# Create the Order and OrderItem entities and start to implement the create method

# Start to use VALIDATION methods from class-validator and class-transformer

- **yarn add class-transformer class-validator**

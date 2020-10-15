# note-book-api

---

## Setup

Run `npm run setup-local` build required files and setup the local database 

---

## Database

**Type**: PSQL (latest)

### Local Database

The local database is exposed on port `5433`. It will be created and started in docker by the setup-local command but can be re-started with the following commands

**Start db locally in docker**: `npm run local-database-up` 
**Tear down local docker db**: `npm run local-database-down` 

---

## Testing

Tests are run using Jest
There are client tests and server tests

_You will need to have already run the setup-local script before runing any server tests_

### Run tests

**Run all tests**: `npm t` (no watch mode option) 
**Run client tests in watch mode**: `npm run test-client` 
**Run server tests in watch mode**: `npm run test-server` 


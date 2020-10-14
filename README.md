# note-book-api

---

## Database

**Type**: PSQL (latest)

### Local Database

The local database is exposed on port `5433`

**Start db locally in docker**: `npm run local-database-up` 
**Tear down local docker db**: `npm run local-database-up` 

---

## Testing

Tests are run using Jest
There are client tests and server tests

### Test database 

**Start test db in docker**: `npm run test-database-up` 
**Tear down test docker db**: `npm run test-database-up` 

### Run tests

**Run all tests**: `npm t` (no watch mode option) 
**Run client tests in watch mode**: `npm run test-client` 
**Run server tests in watch mode**: `npm run test-server` 


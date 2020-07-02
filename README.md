# Introduction

This is a reproduction of https://github.com/prisma/prisma/issues/2907

The reproduction only happens when there is a relation and each side of relation has an enum and the Prisma client query is run through a database running behind PgBouncer

To reproduce:

1. Fill env var `DATABASE_URL` in `prisma/.env` folder without PgBouncer
2. Migrate the database `yarn prisma migrate save --name init --experimental; yarn prisma migrate up --experimental;`
3. Generate the client `yarn prisma generate`
4. Run `node index.js` -> This works
5. Replace `DATABASE_URL` in `prisma/.env` with a PgBouncer connection string (with `pgbouncer=true` connection string param)
6. Run `node index.js` -> This fails with

```
ConnectorError(ConnectorError { user_facing_error: None, kind: QueryError(Error { kind: Db, cause: Some(DbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState("26000"), message: "prepared statement \"s1\" does not exist", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("prepare.c"), line: Some(512), routine: Some("FetchPreparedStatement") }) }) })
    at PrismaClientFetcher.request (/Users/divyendusingh/Documents/prisma/p2-do-bouncer/node_modules/@prisma/client/runtime/index.js:1:185866)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
(node:26989) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)
(node:26989) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

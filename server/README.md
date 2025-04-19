# Server

Before starting the Server, ensure that your terminal is in the right directory
Ensure that your node version is v18.17.0 to ensure a smooth installation experience

Prequisite:

- Node v18.17.0
- MySQL 8+

Optional:

- Run db migration `db_migration.sql` and seeder `db_seed.sql` scripts
- if you are using postman you may import `AdvisoryApps-test.postman_collection.json` to your postman and see the example of the api calls

To start the Server:

- Create a .env file in the root of server you may refer to the `.env-example` for the relevant envs used
- Run `npm install`
- Run `npm run dev`

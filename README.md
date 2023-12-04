## Installation
1. Clone the repository
2. Run `npm install`
3. Run `npx prisma generate`
4. Change the host & port in `app.ts` to your desired host & port
5. Change the configuration in `.env` to your database and the location of the mysql socket
6. Run `npm run build` to build the project
7. Run `npx pm2 start src/app.js` to start the pm2 processs
8. Run `npx pm2 logs` to see the logs

## Routes
- `/healthcheck` - Healthcheck route
- `/dbhealthcheck` - Database healthcheck route

## Useful links
- [pm2 cheatsheet](https://devhints.io/pm2)
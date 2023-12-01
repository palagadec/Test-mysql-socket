## Installation
1. Clone the repository
2. Run `npm install`
3. Run `npx prisma generate`
4. Change the configuration in `.env` to your database and the location of the mysql socket
5. Run `npm run build` to build the project
6. Run `npx pm2 start src/app.js` to start the pm2 processs
7. Run `npx pm2 logs` to see the logs
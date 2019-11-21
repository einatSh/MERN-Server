This is the server side of a MERN project (which uses MongoDb, Express, React and Node.js). 

Server side can be found here: [MERN-Client](https://github.com/einatSh/MERN-Client)

## In order to run both client and server concurrently:
1. Clone both projects into the same folder 
2. In the terminal type: `npm init`, and then type `npm i concurrently`
3. In the package.json file, add the script: "start-all": `"concurrently \"cd client && npm run server\" \"cd server && npm run client\""` 
4. Run script from terminal with the commend: `npm run start-all`

## Available Scripts


const dbConfig = require("./Config/Keys.js");
const mongos = require("mongoose");

mongos.Promise = global.Promise;

module.exports = {
    // connect to db
    connect: () => mongos.connect(dbConfig.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
                    .then(() => {
                        console.log("connected to db");

                    })
                    .catch(err => console.log(err)),
    disconnect: () => mongos.disconnect().then(()=>console.log("disconnected from db")),
    dropScheme: (schemaName) => {
        mongos.connection.db.dropCollection(schemaName).catch(err => this.console.log(err))
    }
};
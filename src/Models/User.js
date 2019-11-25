const mongos = require("mongoose");
const schem = mongos.Schema;
// const AutoIncrementFactory = require('mongoose-sequence');
// const configKey = require("../Config/Keys");

// const connection = mongos.createConnection(configKey.mongoURI);

// const AutoIncrement = AutoIncrementFactory(connection);

const userSchem = new schem({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//userSchem.plugin(AutoIncrement, {inc_feild: "id"});

module.exports = user = mongos.model("user", userSchem);


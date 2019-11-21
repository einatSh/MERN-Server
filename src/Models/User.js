const mongos = require("mongoose");
const schem = mongos.Schema;

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
        // unique: true
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

module.exports = user = mongos.model("user", userSchem);
// mongoose user schema class
const mongos = require("mongoose");
const schem = mongos.Schema;
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

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
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

// hash user password on every new save 
userSchem.pre("save", function(next) {
    var user = this;

    // only hash if the password is new or changed
    if(!user.isModified("password")){
        return next();
    }
    
    // generate a salt
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err);
        }

        // hash the password
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
});

userSchem.methods.isValid = (password, hash, cb) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err){
            return cb(err);
        }
        cb(null, isMatch);
    })
}

module.exports = User = mongos.model("User", userSchem);


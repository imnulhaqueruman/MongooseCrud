const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }

});
UserSchema.methods.generateJWT = function() {
    const token = jwt.sign({ _id: this._id, email: this.email, name: this.name }, process.env.JWT_Secret);
    return token;
}

module.exports = mongoose.model('User', UserSchema)
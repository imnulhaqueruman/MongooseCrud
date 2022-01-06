const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
// instance methods
todoSchema.methods = {
        findActive: function() { //  custom function using mongoose model
            return mongoose.model("Todo").find({ status: 'active' })
        },
        findActiveCallBack: function(cb) { //  custom function using mongoose model
            return mongoose.model("Todo").find({ status: 'active' }, cb)
        }
    }
    // static methods
todoSchema.statics = {
        findByJS: function() {
            return this.find({ title: /mong/i }); // custom function
        },
    }
    //query helper 
todoSchema.query = {
    byLanguage: function(language) {
        return this.find({ title: new RegExp(language, "i") }); // custom function and arrow function cannot bind with this
    },
}

module.exports = mongoose.model('Todo', todoSchema)
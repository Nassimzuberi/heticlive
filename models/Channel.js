var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChannelSchema = new Schema({
    name: {type: String,require:true, unique:true},
    state: {type: Boolean},
    
})

module.exports = mongoose.model('Channel',ChannelSchema)
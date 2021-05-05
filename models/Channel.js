var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChannelSchema = new Schema({
    name: {type: String,require:true, unique:true},
    state: {type: Boolean},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
})


module.exports = mongoose.model('Channel',ChannelSchema);
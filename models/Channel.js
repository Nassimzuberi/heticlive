var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChannelSchema = new Schema({
    name: {type: String,require:true, unique:true},
    state: {type: Boolean, default: false},
    stream_key : {type: String,require:true, unique:true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true,
    }
    
})


module.exports = mongoose.model('Channel',ChannelSchema);
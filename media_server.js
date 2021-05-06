const mongoose = require('mongoose')
const NodeMediaServer = require('node-media-server'),
    config = require('./config').rtmp_server;

nms = new NodeMediaServer(config);

const Channel = mongoose.model('Channel');

nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    Channel.findOne({stream_key: stream_key}, (err, channel) => {
        if (!err) {
            if (!channel) {
                let session = nms.getSession(id);

                session.reject();
            } else {
            }
        }
    });
});

nms.on('postPublish', (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    Channel.findOne({stream_key: stream_key}, (err, channel) => {
        if (!err) {
            if (!channel) {
                let session = nms.getSession(id);

                session.reject();
            } else {
                channel.state = true
                channel.save()
            }
        }
    });
});

nms.on('donePublish', (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    Channel.findOne({stream_key: stream_key}, (err, channel) => {
        if (!err) {
            if (!channel) {
                let session = nms.getSession(id);

                session.reject();
            } else {
                channel.state = false
                channel.save()
            }
        }
    });
});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};

module.exports = nms;
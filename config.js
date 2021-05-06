const config = {
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc'
    },
    rtmp_server: {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8888,
            mediaroot: './server/media',
            allow_origin: '*'
        },
        relay: {
            ffmpeg: 'D:/ffmpeg/bin/ffmpeg.exe',
            tasks: [
                {
                    app: 'stream',
                    mode: 'push',
                    edge: 'rtmp://localhost/hls',
                },
            ],
        },
        trans: {
            ffmpeg: 'D:/ffmpeg/bin/ffmpeg.exe',
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
                }
            ]
        },
        fission: {
            ffmpeg: 'D:/ffmpeg/bin/ffmpeg.exe',
            tasks: [
                {
                    rule: "live/*",
                    model: [
                        {
                            ab: "128k",
                            vb: "1500k",
                            vs: "1280x720",
                            vf: "30",
                        },
                        {
                            ab: "96k",
                            vb: "1000k",
                            vs: "854x480",
                            vf: "24",
                        },
                        {
                            ab: "96k",
                            vb: "600k",
                            vs: "640x360",
                            vf: "20",
                        },
                    ]
                },
            ]
        }
    }
};

module.exports = config;
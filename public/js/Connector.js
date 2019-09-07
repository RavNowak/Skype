import Peer from 'peerjs';

export class Connector {
    constructor(peer) {
        this.connection = null;
        this.peer = new Peer(peer, {
            config: {
                'iceServers': [
                    { url: 'stun:stun1.l.google.com:19302' },
                    {
                        url: 'turn:numb.viagenie.ca',
                        credential: 'muazkh',
                        username: 'webrtc@live.com'
                    }
                ]
            }
        });
    }

    onOpenConnection(callback) {
        this.peer.on('open', callback);
    }

    connect() {
        this.connection = this.peer.connect($("#guest-id").val());
        //callback("You can now send messages to " + $("#guest-id").val());
        //$("#guest-id").val("");
        this.connection.on('open', () => {
            this.sendMsg('Hi!');
        });
    }

    sendMsg(text) {
        if (this.connection) {
            this.connection.send(text);
        }
    }

    sendStream(stream) {
        console.log("Send stream to " + $("#guest-id").val());
        this.peer.call($("#guest-id").val(), stream);
    }

    receiveMsg(callback) {
        this.peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                callback(data);
            });
        });
    }

    receiveStream(windowStream) {
        this.peer.on('call', call => {
            call.answer(windowStream);

            call.on('stream', stream => {
                console.log("Wyswietlam stream");
                $("#guest-video")[0].srcObject = stream;
                $("#guest-video")[0].play();
            });

            call.on('close', function() {
                alert("The videocall has finished");
            });

            // use call.close() to finish a call
        });
    }
}
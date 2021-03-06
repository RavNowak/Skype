import { MSGTYPE, MSGMODE, Message } from './message.js';

const displayMsg = (message, mode, connector) => {
    if (!message.isEmpty()) {
        const singleMsgBox = $("<div class='" + mode + "'></div>").text(message.getContent());
        const timeStamp = $("<div class=time-stamp></div>").text(generateTimeStamp());

        singleMsgBox.append(timeStamp);

        switch (mode) {
            case MSGMODE.USER:
                if (!connector.isConnectionCreated()) {
                    alert('First select the guest');
                    return;
                }

                getActiveReciveBox().append(singleMsgBox);

                break;

            case MSGMODE.GUEST:
                $('#recived-box-' + message.getSender()).append(singleMsgBox);

                displayUnreadMsgIcon(message.getSender());

                displayUnreadMsgIcon();

                break;
        }
    }
}

const displayUnreadMsgIcon = (sender) => {
    if (getActiveReciveBox().attr('id').includes(sender) === false) {
        if ($('#unread-msg-' + sender).css('visibility') === 'hidden') {
            $('#unread-msg-' + sender).css('visibility', 'visible');
        }
    }
}

const getActiveReciveBox = () => {
    let result = null;

    $('.msg-box').find('*').map(function() {
        if (($(this).css('display') === 'block') && ($(this).hasClass('recived-box'))) {
            result = $(this);
            return;
        }
    });

    return result;
}

const getConnectedGuest = () => {
    return getActiveReciveBox().attr('id').split('-')[2];
}

const generateTimeStamp = () => {
    const now = new Date();

    return now.toLocaleTimeString();
}

const clearBox = el => {
    el.val('');
}

const isVideoOn = () => {
    return ($("#video-box").css("display") === "flex");
}

const setDefaultBoxHeight = (el) => {
    el.css('height', 'auto');
}

const createVideo = () => {
    const userVideo = $('<video />', {
        id: 'user-video',
        autoplay: true
    });

    const guestVideo = $('<video />', {
        id: 'guest-video',
        autoplay: true
    });

    $('.user-video').append(userVideo);
    $('.guest-video').append(guestVideo);

    $("#video-box").fadeIn("slow").css('display', 'flex');
}

const removeVideo = () => {
    if ($("#user-video")[0].srcObject) {
        $("#user-video")[0].srcObject.getTracks().forEach(track => track.stop());
    }

    if ($("#guest-video")[0].srcObject) {
        $("#guest-video")[0].srcObject.getTracks().forEach(track => track.stop());
    }

    $('#user-video').remove();
    $('#guest-video').remove();

    $("#video-box").css('display', 'none').fadeOut("slow");
}

const changeCallBtnBackground = () => {
    $('#call-btn').toggleClass('call-inactive');
    $('.fa-phone').toggleClass('fa-phone-slash');
}

const autoSize = el => {
    if (!isVideoOn()) {
        setTimeout(() => {
            el.style.cssText = 'height:auto; padding:0';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 0);
    }
}

const setRecivedBoxScrollBar = () => {
    getActiveReciveBox().scrollTop(getActiveReciveBox()[0].scrollHeight);
}

const captureUserCamera = (connector, callback) => {
    const constraints = { video: true, audio: true };

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            $("#user-video")[0].srcObject = new MediaStream(stream.getVideoTracks());
            connector.setLocalStream(stream);
        }).then(() => {
            callback();
        }).catch(e => {
            console.log(e);
        });
    } else {
        alert("Can not acces user camera");
    }
}

const sendMsg = (message, connector) => {
    if (connector.isConnectionCreated()) {
        connector.sendMessageToGuest(message);
    }
}

const connect = (guestLogin, connector) => {
    $.get('/getUserPeer', { login: guestLogin }, function(guestPeer, status) {
        connector.createConnectionTo(guestPeer);
    });
}

const setUserBoxBackgroundColor = (userBox) => {
    $('.single-user-box').css('background-color', '');
    userBox.css('background-color', 'rgba(9, 64, 109, 0.486)');
}

const displayUserInfo = user => {
    $.get('/getUserInfo', { login: user.login }, function(user, status) {
        $('#conn-title').text(user.login);
        $('#conn-status').text('Status: ' + user.status);
        $('#conn-mail').text('Email: ' + user.mail);
        if (user.activity === '') {
            $('#conn-activity').text('Last login: never');
        } else {
            $('#conn-activity').text('Last login: ' + user.activity);
        }

        if ($(".connection-info").css("display") === "none") {
            $(".connection-info").fadeIn("slow").css('display', 'block');
        } else {
            $(".connection-info").fadeOut('fast');
            $(".connection-info").fadeIn("slow").css('display', 'block');
        }
    });
}

const displayUserReciveBox = user => {
    $('.recived-box').css('display', 'none');
    $('#recived-box-' + user.login).css('display', 'block');
}

const isEnterPressed = (e) => {
    const asciiEnter = 13;
    return e.keyCode === asciiEnter;
}

export const getCookie = (key) => {
    let cookies = document.cookie.replace(/\s+/g, '').split(';');

    if (cookies.length === 0) {
        console.log("No cookies available");

        return;
    }

    let cookieObj = {};

    for (let i = 0; i < cookies.length; i++) {
        const key = cookies[i].substring(0, cookies[i].indexOf('='));

        cookieObj[key] = cookies[i].substring(cookies[i].indexOf('=') + 1, cookies[i].length);
    }

    return cookieObj[key];
}

export const handleUsers = (connector) => {
    $.get('/getUsers', function(users, status) {
        users.forEach(user => {
            if (user.login !== getCookie('login')) {

                const userBox = $("<div class='single-user-box'></div>");

                const userNick = $("<div class='single-nick-box'></div>").text(user.login);

                const unreadMsg = $("<div class='unread-msg' id='unread-msg-" + user.login + "'></div>").append('<i class="far fa-envelope"></i>');

                unreadMsg.css('visibility', 'hidden');

                userBox.append(userNick).append(unreadMsg);

                const reciveMsgBox = $('<div class="recived-box scroll" id="recived-box-' + user.login + '"></div>').css('display', 'none');

                $('.msg-box').prepend(reciveMsgBox);

                userBox.click(() => {

                    setUserBoxBackgroundColor(userBox);

                    connect(user.login, connector);

                    displayUserInfo(user);

                    displayUserReciveBox(user);

                    userBox.find('.unread-msg').css('visibility', 'hidden');

                });
                $('.users-list').append(userBox);
            } else {
                $('#conn-title').text('Hi, ' + user.login + ' !');
            }
        });
    });
}

export const handleRecivedMessage = (input, connector) => {
    switch (input.type) {
        case MSGTYPE.TXT:
            displayMsg(new Message(input.type, input.content, input.sender), MSGMODE.GUEST, connector);
            break;
        case MSGTYPE.ORDER:
            // handleRecivedOrder(input);
            break;
    }
    setRecivedBoxScrollBar();
}

// const handleRecivedOrder = (input) => {
//     switch (input.content) {
//         case ORDERTYPE.REJECTED_CALL:
//             if (isVideoOn()) {
//                 removeVideo();
//                 connector.stopStreaming();
//                 alert(getConnectedGuest() + "rejected the call");
//             }
//             break;
//     }
// }

export const handleRecivedStream = (call, connector) => {
    let acceptCall = null;

    if (!isVideoOn()) {
        acceptCall = confirm("Videocall incoming, do you want to accept it ?");

        if (acceptCall === true) {

            createVideo();

            captureUserCamera(connector, () => {
                call.answer(connector.getLocalStream());
            });

            call.on('stream', stream => {
                $("#guest-video")[0].srcObject = stream;
            });

            call.on('close', () => {
                console.log("The videocall has finished");
            });

            changeCallBtnBackground();
        }
    } else {


    }
}

export const handleSendButtonClick = (connector) => { //zmiana
    const message = new Message(MSGTYPE.TXT, $('#send-box').val(), getCookie('login'));
    displayMsg(message, MSGMODE.USER, connector);
    sendMsg(message.toNativeObject(), connector);
    setDefaultBoxHeight($('#send-box'));
    clearBox($('#send-box'));
    setRecivedBoxScrollBar();
}

export const handleSendBoxEnterPressd = (event, connector) => {
    if (isEnterPressed(event)) {
        event.preventDefault();
        const message = new Message(MSGTYPE.TXT, $('#send-box').val(), getCookie('login'));
        displayMsg(message, MSGMODE.USER, connector);
        sendMsg(message.toNativeObject(), connector);
        setDefaultBoxHeight($('#send-box'));
        clearBox($('#send-box'));
        setRecivedBoxScrollBar();
    } else {
        autoSize($('#send-box')[0]);
    }
}

export const handleCallButtonClick = (connector) => {

    if (!connector.isConnectionCreated() && !isVideoOn()) {
        alert('First select guest');
    } else {
        if (isVideoOn()) {
            removeVideo();
            connector.stopStreaming();
        } else {
            createVideo();
            captureUserCamera(connector, () => {
                $.get('/getUserPeer', { login: getConnectedGuest() }, (guestPeer, status) => {
                    connector.sendLocalStreamToGuest(guestPeer);
                });
            });
        }
        changeCallBtnBackground();
    }
}

export const handleLogoutButtonClick = () => {
    $.get('/logout', (data, status) => {
        window.location.replace(data.url);
    });
}

export const handleDisplayMenu = (event) => {
    $('#menu-btn').click(() => {
        $('#menu-btn').css('display', 'none');
        $('.menu').css('display', 'block');
    });

    if (event.pageX < $(window).width() - $('.menu').width()) {
        $('.menu').css('display', 'none');
        $('#menu-btn').css('display', 'block');
    }
}

export const handleSearchUser = () => {
    $('.users-list').find('*').map(function() {
        if ($(this).text().includes($('.search-user-box').val())) {
            $(this).css('display', 'block');
        } else {
            $(this).css('display', 'none');
        }
    });
}
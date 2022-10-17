import './chats.scss';

const timeNow = new Date();

const enterPoint = document.querySelector('.screen__chats-messages');

function makeDiv(name, div) {
    let nameDiv = document.createElement(`${div}`);
    nameDiv.classList.add(`${name}`);
    return nameDiv;
}

async function getFriends() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    fillFriends(users);
    getList();
}

function fillFriends(array) {
    array.forEach((friend) => {
        createFriendElem(friend);
    });
}

function createFriendElem(friend) {
    const time = ` ${timeNow.getDate()} ${timeNow.getMonth()} ${timeNow.getFullYear()}`;
    const text = friend.company.catchPhrase;
    const aUrl = `https://avatars.dicebear.com/api/human/${friend.username}.svg`;
    const username = friend.name;

    const message = makeDiv('message', 'div');
    enterPoint.append(message);

    const messageAvatar = makeDiv('message__avatar', 'img');
    message.append(messageAvatar);
    messageAvatar.src = aUrl;

    const messageMain = makeDiv('message__main', 'div');
    message.append(messageMain);

    const messageMessage = makeDiv('message__message', 'div');
    messageMain.append(messageMessage);

    const messageBottom = makeDiv('message__bottom', 'div');
    messageMain.append(messageBottom);

    const messageUsername = makeDiv('message__username', 'p');
    messageMessage.append(messageUsername);
    messageUsername.innerText = username;

    const messageTime = makeDiv('message__time', 'p');
    messageMessage.append(messageTime);
    messageTime.innerText = time;

    const messageMessageText = makeDiv('message__messageText', 'p');
    messageBottom.append(messageMessageText);
    messageMessageText.innerText = text;
}

getFriends();

function getList() {
    const listFriend = document.querySelectorAll('.message');
    listFriend.forEach((elem) => {
        elem.addEventListener('click', () => {
            listFriend.forEach((elem1) => {
                elem1.classList.remove('active');
            });
            elem.classList.toggle('active');
        });
    });
}

function hideElement(btn, toHideElem) {
    document.querySelector(btn).addEventListener('click', () => {
        document.querySelector(toHideElem).classList.toggle('hide');
    });
}

hideElement('.screen__chat-input__add', '.screen__chat__menu');
hideElement('.screen__chat-button', '.screen__chat__toggleMenu');

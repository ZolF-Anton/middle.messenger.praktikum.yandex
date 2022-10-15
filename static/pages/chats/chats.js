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
    const a_url = `https://avatars.dicebear.com/api/human/${friend.username}.svg`;
    const username = friend.name;

    const message = makeDiv('message', 'div');
    enterPoint.append(message);

    const message__avatar = makeDiv('message__avatar', 'img');
    message.append(message__avatar);
    message__avatar.src = a_url;

    const message__main = makeDiv('message__main', 'div');
    message.append(message__main);

    const message__message = makeDiv('message__message', 'div');
    message__main.append(message__message);

    const message__bottom = makeDiv('message__bottom', 'div');
    message__main.append(message__bottom);

    const message__username = makeDiv('message__username', 'p');
    message__message.append(message__username);
    message__username.innerText = username;

    const message__time = makeDiv('message__time', 'p');
    message__message.append(message__time);
    message__time.innerText = time;

    const message__messageText = makeDiv('message__messageText', 'p');
    message__bottom.append(message__messageText);
    message__messageText.innerText = text;
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

// const clinch = document.querySelector('.screen__chat-input__add');
// clinch.addEventListener('click', () => {
//     const clinchMenu = document.querySelector('.screen__chat__menu');
//     clinchMenu.classList.toggle('hide');
// });

// screen__chat - button;

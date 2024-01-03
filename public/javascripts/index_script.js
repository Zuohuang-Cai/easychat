import { WebSocketClient } from './commit.js';
class user {
    constructor() {
        this.frindslist = document.querySelector('#friendList');
        this.fetchFriends()
            .then((array) => { array.forEach(element => this.frindslist.appendChild(this.generateFriendElement(element.name, element.img, element.id))); return array })
            .then((array) => { this.selectbutton(); this.connections = new WebSocketClient(array[0].id),this.connections.setupWebSocket(),this.connections.refreshpage() });
        this.Generateself(decodeURIComponent(this.getCookie('name')), decodeURIComponent(this.getCookie('img')));
    }
    Generateself(name, img) {
        if (img == "j:null") {
            img = "https://vfk-iserlohn.de/wp-content/uploads/2016/07/vfk-iserlohn-kein-profilbild-neu.jpg"
        }
        document.querySelector("#username").textContent = name;
        document.querySelector("#userprofilfoto").src = img;
    }
    async fetchFriends() {
        try {
            const resp = await fetch("http://127.0.0.1:8080/api/getfriendslist");
            const data = await resp.json();
            return data;
        } catch (error) {
            console.error("Error fetching friends:", error);
            return null;
        }
    }
    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    selectbutton() {
        const buttons = document.querySelectorAll(".friends");
        buttons[0].classList.add('activedfriend');
        buttons.forEach(element => {
            element.addEventListener("click", (event) => {
                buttons.forEach(button => button.classList.remove('activedfriend'));
                event.target.classList.add('activedfriend');
            })
        });
    }
    generateFriendElement(name, imgsrc, id) {
        if (imgsrc == null) {
            imgsrc = "https://vfk-iserlohn.de/wp-content/uploads/2016/07/vfk-iserlohn-kein-profilbild-neu.jpg"
        }
        const friendTemplate = document.getElementById('friendTemplate');
        const clone = document.importNode(friendTemplate.content, true);
        const button = clone.querySelector('button');
        const img = clone.querySelector('img');
        const span = clone.querySelector('span');
        button.addEventListener('click', () => {
            console.log(id);
            this.connections.closeconnection();
            this.connections = new WebSocketClient(id);
            this.connections.setupWebSocket();
            this.connections.refreshpage();
        });
        img.src = imgsrc;
        span.textContent = name;
        return clone;
    }
}

let users = new user();
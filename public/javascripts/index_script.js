class user {
    constructor() {
        this.frindslist = document.querySelector('#friendList');
        this.fetchFriends()
            .then((array) => array.forEach(element =>
                this.frindslist.appendChild(this.generateFriendElement(element.name, element.img))));
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
    
    generateFriendElement(name, imgsrc) {
        if (imgsrc == null) {
            imgsrc = "https://vfk-iserlohn.de/wp-content/uploads/2016/07/vfk-iserlohn-kein-profilbild-neu.jpg"
        }
        const friendTemplate = document.getElementById('friendTemplate');
        const clone = document.importNode(friendTemplate.content, true);
        const button = clone.querySelector('button');
        const img = clone.querySelector('img');
        const span = clone.querySelector('span');
        button.addEventListener('click', () => {
            console.log('Button clicked!');
        });
        img.src = imgsrc;
        span.textContent = name;
        return clone;
    }
}

let a_user = new user();
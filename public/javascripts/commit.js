class WebSocketClient {
    constructor(ChatTo) {
        this.ChatTo = ChatTo;
        // dont use setupwebsocket() in constructor , that wil make you misfortune!!!!!
    }
    setupWebSocket() {
        this.commithtml = document.querySelector("#commithtml");
        this.name = this.getCookie("name");
        this.img = this.getCookie("img");
        this.id = parseInt(this.getCookie("id"));

        this.iframeDocument = this.commithtml.contentDocument || this.commithtml.contentWindow.document;

        this.ws = new WebSocket('ws://localhost:8080');
        this.ws.onopen = () => {
            console.log('WebSocket connected');
            console.log(this.ChatTo);
            this.ws.send(JSON.stringify(["open", this.id]));
        };
        this.ws.onclose = () => {
            console.log('WebSocket closed');
        };
        this.ws.onmessage = (event) => {
            let parseddata = JSON.parse(event.data);
            this.StoreData(parseddata[3], parseddata[1],parseddata[2]);
            this.newParagraph(`${parseddata[0]} ${parseddata[1]}`, parseddata[2]);

        };
        this.iframeDocument.querySelector("#button-addon1").addEventListener("click", () => {
            let input = this.iframeDocument.querySelector("#textbalk");
            this.StoreData(this.ChatTo, input.value);
            this.newParagraph(`${this.name} ${input.value}`, this.img);
            this.sendMessage(this.ChatTo, input.value);
            input.value = '';
        });
        let input = this.iframeDocument.querySelector("#textbalk");
        input.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    StoreData(id, text,img) {
        let chathistories = JSON.parse(localStorage.getItem(JSON.stringify(id))) || [];
        console.log(chathistories);
        let newdata = { "name": this.name, "text": text, "img": this.img };
        chathistories.push(newdata);
        localStorage.setItem(JSON.stringify(id), JSON.stringify(chathistories));
    }
    newParagraph(text, img) {
        if (img == "j:null") {
            img = "https://vfk-iserlohn.de/wp-content/uploads/2016/07/vfk-iserlohn-kein-profilbild-neu.jpg";
        }
        const line = this.iframeDocument.createElement("div");
        line.classList.add("chat-line");

        const chatfoto = this.iframeDocument.createElement("img");
        chatfoto.src = img;
        chatfoto.classList.add("chat-image");

        const newPara = this.iframeDocument.createElement("p");
        newPara.textContent = text;

        line.appendChild(chatfoto);
        line.appendChild(newPara);

        this.iframeDocument.querySelector("main").appendChild(line);
    }

    refreshpage() {
        let chats = this.iframeDocument.querySelector("main");
        let footer = this.iframeDocument.querySelector("footer");
        chats.parentNode.removeChild(chats);
        let main = this.iframeDocument.createElement("main");
        this.iframeDocument.body.insertBefore(main, footer);
        let datas = JSON.parse(localStorage.getItem(JSON.stringify(this.ChatTo)));
        datas.forEach(data => {
            this.newParagraph(data.text, data.img);
        });
    }

    closeconnection() {
        console.log(this.ChatTo, "close");
        this.ws.send(JSON.stringify(["close", this.id]));
        this.ws.close();
        this.iframeDocument.querySelector("#button-addon1").removeEventListener("click", () => { });
        this.commithtml = null;
        this.name = null;
        this.img = null;
        this.id = null;
        this.iframeDocument = null;
        this.ChatTo = null;
    }
    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                const cookieValue = cookie.substring(name.length + 1);
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }
    sendMessage(SendToperson, message) {
        console.log(SendToperson);
        this.ws.send(JSON.stringify(["message", this.name, SendToperson, message, this.img, this.id]));
    }
}

export { WebSocketClient };

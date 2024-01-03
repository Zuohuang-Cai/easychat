class WebSocketClient {
    constructor(ChatTo) {
        this.ChatTo = ChatTo;
        this.setupWebSocket();
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
            this.ws.send(JSON.stringify(["open", this.id]));
        };
        this.ws.onclose = () => {
            console.log('WebSocket closed');
            this.ws.send(JSON.stringify(["close", this.id]));
        };
        this.ws.onmessage = (event) => {
            this.newParagraph(`${JSON.parse(event.data)[0]} ${JSON.parse(event.data)[1]}`, JSON.parse(event.data)[2]);

        };
        this.iframeDocument.querySelector("#button-addon1").addEventListener("click", () => {
            let text = this.iframeDocument.querySelector("#textbalk").value;
            console.log(this.ChatTo);
            this.sendMessage(this.ChatTo, text); //send to ...
        });
    }
    // newParagraph(text) {
    //     const line = "<div></div>";
    //     const chatfoto = this.iframeDocument.createElement("img");
    //     chatfoto.height = "25px";
    //     chatfoto.width = "25px";
    //     const newParagraph = this.iframeDocument.createElement("p");
    //     line.appendChild(chatfoto,newParagraph)
    //     newParagraph.textContent = text;
    //     this.iframeDocument.querySelector("main").appendChild(line);
    // }
    newParagraph(text, img) {
        const line = this.iframeDocument.createElement("div");
        line.classList.add("chat-line");

        const chatfoto = this.iframeDocument.createElement("img");
        chatfoto.src = img;
        console.log(chatfoto.img);
        chatfoto.classList.add("chat-image");

        const newPara = this.iframeDocument.createElement("p");
        newPara.textContent = text;

        line.appendChild(chatfoto);
        line.appendChild(newPara);

        this.iframeDocument.querySelector("main").appendChild(line);
    }

    closeconnection() {
        this.ws.close();
        this.iframeDocument.querySelector("#button-addon1").removeEventListener("click", () => {});
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
        this.ws.send(JSON.stringify(["message", this.name, SendToperson, message, this.img]));
    }
}

export { WebSocketClient };
// const client = new WebSocketClient(document.querySelector('#commithtml'));

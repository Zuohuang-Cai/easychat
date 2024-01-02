
class WebSocketClient {
    constructor(commithtml) {
        this.name = this.getCookie("name")
        this.img = this.getCookie("img")
        this.id = this.getCookie("id");
        this.iframeDocument = commithtml.contentDocument || commithtml.contentWindow.document;
        commithtml.onload = () => {
            this.ws = new WebSocket('ws://localhost:8080');
            this.setupWebSocket();
            this.iframeDocument.querySelector("#button-addon1").addEventListener("click", () => {
                let text = client.iframeDocument.querySelector("#textbalk").value;
                client.sendMessage(2, text);//person who wil recived
            })
        }
    }
    setupWebSocket() {
        this.ws.onopen = () => {
            console.log('WebSocket connected');
            this.ws.send(JSON.stringify(["open", parseInt(this.getCookie("id"))]));
        };

        this.ws.onclose = () => {
            console.log('WebSocket closed');
            this.ws.send(JSON.stringify(["close", parseInt(this.getCookie("id"))]));
        };

        this.ws.onmessage = (event) => {
            this.newParagraph(`${JSON.parse(event.data)[0]} ${JSON.parse(event.data)[1]}`, JSON.parse(event.data)[2])
        };
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
        chatfoto.src = "https://wallpaperaccess.com/full/5559365.jpg";
        chatfoto.classList.add("chat-image");

        const newPara = this.iframeDocument.createElement("p");
        newPara.textContent = text;

        line.appendChild(chatfoto);
        line.appendChild(newPara);

        this.iframeDocument.querySelector("main").appendChild(line);
    }


    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                const cookieValue = cookie.substring(name.length + 1);
                return decodeURIComponent(cookieValue); // 解码 URL 编码的字符串
            }
        }
        return null;
    }


    sendMessage(SendToperson, message) {
        this.ws.send(JSON.stringify(["message", this.name, SendToperson, message, this.img]));
    }
}

const client = new WebSocketClient(document.querySelector('#commithtml'));


class WebSocketClient {
    constructor(commithtml) {
        this.iframeDocument = commithtml.contentDocument || commithtml.contentWindow.document;
        commithtml.onload = () => {
            this.person = 1;
            this.ws = new WebSocket('ws://localhost:8080');
            this.setupWebSocket();
            this.iframeDocument.querySelector("#button-addon1").addEventListener("click", () => {
                let text = client.iframeDocument.querySelector("#textbalk").value;
                client.sendMessage(2, text);
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
            if (Array.isArray(JSON.parse(event.data))) {
                this.newParagraph(`001 send you ${JSON.parse(event.data)[1]}`)
            } else {
                this.newParagraph(event.data);
            }
        };
    }
    newParagraph(text) {
        const newParagraph = this.iframeDocument.createElement("p");
        newParagraph.textContent = text;
        this.iframeDocument.querySelector("main").appendChild(newParagraph);
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

    sendMessage(SendToperson, message) {
        this.ws.send(JSON.stringify(["message", this.person, SendToperson, message]));
    }
}

const client = new WebSocketClient(document.querySelector('#commithtml'));

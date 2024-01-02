function getmysqldate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function parseUserIdFromMessage(req) {
    return req.params.id;
}

module.exports = {
    getmysqldate,
    parseUserIdFromMessage,
}
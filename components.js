let library = require("./public/javascripts/library");

class person {
    constructor(pool) {
        this.pool = pool;
    }
    CreateNewAccound(name, username, password, req, res) {
        if (req.body.Nickname.trim() === '' || req.body.Username.trim() === '' || req.body.Password.trim() === '') {
            res.render('signstatus.ejs', { status: 'Input cannot be empty.' });
            return;
        }
        this.pool.query("INSERT INTO USERS (name,accountage,username,password)VALUES (?,?,?,?)", [name, library.getmysqldate(), username, password], function (err, rows, fields) {
            if (err) {
                res.render('signstatus.ejs', { status: "usernaam al bestaat" });
                return;
            }
            res.render('signstatus.ejs', { status: "sign succesvol!, you can login now" });
        });
    }
    Loggin(username, password, req, res) {
        this.pool.query('SELECT * FROM `USERS` WHERE `username` = ? AND `password` =?', [username, password], function (err, rows, fields) {
            if (!rows.length) {
                res.render('signstatus.ejs', { status: "sorry we heb je account niet gevond" });
                return;
            }
            req.session.user_id = rows[0].id;
            res.cookie('name', rows[0].name);
            res.cookie('img', rows[0].img);
            res.redirect("/chat");
        });
    }
    Getfriendlist(userid, res) {
        this.pool.query("SELECT id,name,img FROM `friends` INNER JOIN `users` ON users.id = friends.firstid OR users.id = friends.secondid Where friends.firstid = ? or friends.secondid = ?;", [userid, userid], function (err, rows, fields) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(rows.filter(row => row.id != userid));
        })
    }
    AddFriends(firstid, secondid, res) {
        const [id1, id2] = firstid > secondid ? [firstid, secondid] : [secondid, firstid];
        this.pool.query('INSERT INTO friends (firstid,secondid)VALUES(?,?);', [id1, id2], function (err, rows, fields) {
            if (err) {
                res.send(err);
                return;
            }
            res.end();
        })
    }
}

module.exports = { person };
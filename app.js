const iching = require('i-ching');
const express = require('express');
const app = express();
const body_parser = require('body-parser');
const pgp = require('pg-promise')({});
const cors = require('cors');
let db_config = process.env.DATABASE_URL || {
    host: "localhost",
    user: "postgres",
    database: "iching_db"
};
const db = pgp(db_config);
const PORT = process.env.PORT || 3000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
app.use(cors());

app.post("/api_login", function(req, resp, next){
    let username = req.body.username;
    let password = req.body.password;
    let q = "SELECT * FROM users WHERE username=${username}";
    db.query(q, {username: username})
        .then( results => {
            if (results.length > 0) {
                if (password === results[0].password){
                    resp.json({message: "Logged in", userId: results[0].id});
                } else {
                    resp.json({message: "Wrong password"});
                }
            } else {
                resp.json({message: "Wrong user"});
            }
        })
        .catch(next);
});

app.post("/api_signup", function(req, resp, next){
    let username = req.body.username;
    let password = req.body.password;
    let q = "SELECT * FROM users WHERE username=${username}";
    db.query(q, {username: username})
        .then( results => {
            if (results.length > 0) {
                resp.json({message: "Username existed"});
                } else {
                    q = "INSERT INTO users VALUES (DEFAULT, ${username}, ${password}) RETURNING id";
                    db.query(q, {username: username, password: password})
                        .then( results => {
                            resp.json({message: "Signed up", userId: results[0].id});
                        });
                }
        })
        .catch(next);
});

app.get("/api", function(req, resp) {
    let reading = iching.ask().change;
    resp.json(reading);
});

app.post("/api_history", function(req, resp, next) {
   let userId = req.body.userId;
   let q = "SELECT id, time, question, gua, togua FROM question WHERE user_id=${userId} ORDER BY time DESC LIMIT 10";
   db.query(q, {userId: userId})
    .then( results => {
        results.forEach( result => {
            let time = result.time.toLocaleString();
            result.time = time;
        });
        resp.json(results);
    })
    .catch(next);
});

app.post("/api_question", function(req, resp, next) {
   let question = req.body.question;
   let gua = req.body.gua;
   let toGua = req.body.toGua;
   let today = new Date();
   let userId = req.body.userId;
   today = today.toLocaleString();
   let q = "INSERT INTO question VALUES (DEFAULT, ${today}, ${question}, ${gua}, ${toGua}, ${userId})";
   db.query(q, {today: today, question: question, gua: gua, toGua: toGua, userId: userId})
    .then( results => {
        console.log(results);
    })
    .catch(next);
});

app.get("/api_glossary/:gua/:id", function(req, resp, next) {
   let number = parseInt(req.params.id, 10);
   let gua = req.params.gua;
   let results;
   if (gua == "hex") {
       results = iching.hexagram(number);
   } else {
       results = iching.trigram(number);
   }
   resp.json(results);
});

app.listen(PORT, function() {
	console.log(
		"\n\n===== listening for requests on port " + PORT + " =====\n\n"
	);
})
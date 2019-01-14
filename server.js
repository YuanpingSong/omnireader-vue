// BodyParser Setup
var bodyParser = require('body-parser');

// Wordlist Setup
// const wordlist_5500 = require('./graduate_5500.json');
// const set_5500 = new Set(wordlist_5500);

// CoreNLP Setup
const CoreNLP = require('corenlp');
const connector = new CoreNLP.ConnectorServer({ dsn: 'http://localhost:9000' });
const props = new CoreNLP.Properties({
    annotators: 'tokenize,ssplit,pos,lemma',
});
const pipeline = new CoreNLP.Pipeline(props, 'English', connector);

// MongoDB Setup
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const db_name = 'dictionary';
// const collection_name = 'definitions';
const cache_collection_name = 'dictionary_cache';
const mercury_cache_name = 'web_cache';
const client = new MongoClient(url);
// let col = null;
let cache_col = null;
let web_cache_col = null;

// Express Setup
const express = require('express');
const app = express();
app.use(express.static('dist'));

// Words API Meta
const wd_baseurl = 'https://wordsapiv1.p.rapidapi.com/words/';
const wd_app_key = '966008f0aamshb26b4e37b0d7392p1a2787jsn6d2648d061fc';

// This middle where sets cors in response
const cors = require('cors');

// Node implementation of fetch API
const fetch = require('node-fetch');

// Assert Library
const assert = require('assert');

// Authentication
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Connect to MongoDB, again!
mongoose.connect('mongodb://localhost/user_db');
const user_db = mongoose.connection;

const User = require('./user');

user_db.on('error', console.error.bind(console, 'connection error:'));
user_db.once('open', function () {
    console.log('mongoose connected to user_db');
});


// Configure Session
app.use(session({
    secret: 'I Love Shanghai',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: user_db
    })
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next(); });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const routes = require('./router');
//app.use('/', routes);

(async function() {
    try {
        await client.connect();
        console.log('Connected correctly to database');
        const db = client.db(db_name);
        // col = db.collection(collection_name);
        cache_col = db.collection(cache_collection_name);
        web_cache_col = db.collection(mercury_cache_name);
    } catch(err) {
        console.log(err.stack);
    }
})();

async function getLemma(word) {
    const sent = new CoreNLP.default.simple.Sentence(word);
    const parsetResult = await pipeline.annotate(sent);
    // console.log(parsetResult.lemma(0));
    return parsetResult.lemma(0);
}


async function lookupOxford(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    const lemma = await getLemma(word);

    const cursor = cache_col.find({word: lemma});
    const result = await cursor.next();

    // console.log(req.session.userId);
    if (!result) {

        console.log('dictionary cache miss: ' + lemma);

        let json = undefined;
        try {
            const od_res = await fetch(wd_baseurl + lemma, {method: 'GET', headers: { "X-RapidAPI-Key": wd_app_key}});
            json = await od_res.json();
        } catch (error) {
            console.log("Rapid API error");
            res.json({success: false});
            return;
        }

        try {
            let r = await cache_col.insertOne(json);
            assert.equal(1, r.insertedCount);
            // console.log("stored into cache: " + json);
        } catch (error) {
            console.log("Error inserting into DB");
            res.json({success: false});
            return;
        }
        //console.log('A');
        // console.log(json);
        if (json.word) {
            // console.log('success');
            if (req.session.userId) {
                await User.findByIdAndUpdate(req.session.userId, {$push: {words: lemma}});
            }
        }
        res.json(json);

    } else {
        console.log('dictionary cache hit: ' + lemma);
        if (req.session.userId) {
            await User.findByIdAndUpdate(req.session.userId, {$push: {words: lemma}});
        }
        res.json(result);
    }
}

app.get('/dict/:word', lookupOxford);

async function onReceiveUrl(req, res) {
    const url = req.query.url;
    const cursor = web_cache_col.find({'url': url});
    const result = await cursor.next();
    let json = null;
    // console.log(result);
    if (!result) {
        console.log('web cache miss: ' + url);
        const req_url = 'https://mercury.postlight.com/parser?url=' + url;
        try {
            const response = await fetch(req_url, { headers: {'Content-Type': 'application/json', 'x-api-key': 'l8akgvjMd0hVZTc0vhURx2yOvRsVi8HberbUt89q'}});
            json = await response.json();
        } catch (error) {
            console.log('encountered error, ignoring request');
        }


        json = {...json, accessed: new MongoDB.Timestamp(0, Math.floor(new Date().getTime() / 1000))};
        web_cache_col.insertOne(json);
        if (req.session.userId) {
            await User.findByIdAndUpdate(req.session.userId, {$push: {articles: json.url}});
        }
    } else {
        console.log('web cache hit: ' + url);
        try {
            await web_cache_col.update(
                {url: url},
                {
                    $currentDate: {
                        accessed: { $type: "timestamp" }
                    }
                });
        } catch (error) {
            console.log('cannot update, ignoring')
        }
        if (req.session.userId) {
            await User.findByIdAndUpdate(req.session.userId, {$push: {articles: url}});
        }
        json = result;
    }
    res.json(json);
}

app.get('/api/webparser', onReceiveUrl);

async function onAddCard(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    if (req.session.userId) {
        await User.findByIdAndUpdate(req.session.userId, {$push: {cards: word}});
        res.json({status: 0});
    } else {
        res.json({status: 1});
    }
}

app.get('/card/:word', onAddCard);


async function onGetCards (req, res) {
    if (req.session.userId) {
        let user = undefined;
        try {
            user = await User.findById(req.session.userId);
        } catch (error) {
            console.log('Illegal User ID');
            res.json({status: 1});
            return;
        }

        if (!user) {
            console.log('Illegal User ID');
            res.json({status: 1});
            return;
        }

        let cardlist = user.cards;
        // console.log(cardlist);

        let json = {cards: []};
        for (let card of cardlist) {
            // console.log('Hi');
            const cursor = cache_col.find({word: card});
            const result = await cursor.next();
            if (result) {
                // console.log('Hi');
                json.cards.push(result);
            }
        }
        // console.log(json);
        res.json({...json, status: 0});
    } else {
        res.json({status: 1});
        // didn't log in
    }
}

app.get('/user/cards', onGetCards);


async function onGetArticles (req, res) {
    if (req.session.userId) {
        let user = undefined;
        try {
            user = await User.findById(req.session.userId);
        } catch (error) {
            console.log('Illegal User ID');
            res.json({status: 1});
            return;
        }

        if (!user) {
            console.log('Illegal User ID');
            res.json({status: 1});
            return;
        }

        let articlelist = user.articles;
        // console.log(articlelist);

        let json = {articles: []};
        for (let article of articlelist) {
            // console.log('Hi');
            const cursor = web_cache_col.find({url: article});
            const result = await cursor.next();
            if (result) {
                // console.log('Hi');
                result.content = "";
                json.articles.push(result);
            }
        }
        // console.log(json);
        res.json({...json, status: 0});
    } else {
        res.json({status: 1});
        // didn't log in
    }
}

app.get('/user/articles', onGetArticles);
// Enable CORS
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/


const onLogin = function (req, res, next) {
    // console.log(req.body);
    // confirm that user typed same password twice
    if (req.body.password !==req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }
    // Case: Account Creation
    if (req.body.email &&
        req.body.username &&
        req.body.password) {

        const userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            // passwordConf: req.body.passwordConf,
        };

        User.create(userData, function (error, user) {
            if (error) {
                const payload = {status: 1};
                return res.json(payload);
            } else {
                const payload = {status: 0};
                req.session.userId = user._id;

                req.session.save(function () {console.log(req.session.userId); res.json(payload);});
                return;
            }
        });
        // Case: logging on
    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                const payload = {username: ""};
                return res.json(payload);
            } else {
                req.session.userId = user._id;
                const dt = new Date();
                console.log('User Logged On: ' + req.session.userId + ", at: " + dt);
                const payload = {username: user.username};
                // console.log('name is ' + user.username);
                req.session.save(function () {res.json(payload);});
                return;
            }
        });
    } else {
        const err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
};

app.post('/login', onLogin);

const onLogOut = function (req, res, next) {

    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            // console.log('destroying session');
            if (err) {
                console.log("Error: Cannot destroy session");
                const payload = {status: 1};
                res.json(payload);
            } else {
                const dt = new Date();
                console.log('User Logged Out: ' + req.session.userId + ", at: " + dt);
                const payload = {status: 0};
                res.clearCookie('connect.sid', { path: '/', httpOnly: true}).json(payload);
                //res.redirect('/');
            }
        });
    }
};

app.get('/logout', onLogOut);

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});

client.close();





/*
async function onReceiveArticle(req, res) {
    if (!req.body) return res.sendStatus(400);
    const text = req.body['article'].trim();
    const sent =  new CoreNLP.default.simple.Document(text);
    const parsedResult = await pipeline.annotate(sent);

    let promises = [];
    for (const sentence of parsedResult.sentences()) {
        for (const token of sentence.tokens()) {
            if (token.lemma().match(/[a-z]/i) && !set_5500.has(token.lemma())) {
                promises.push(lookupWord(token.lemma()));
            }
        }
    }
    const results = await Promise.all(promises);
    const nonNull = results.filter(elt => elt);
    // console.log(results);
    res.json(nonNull);
}

app.post('/api/article', jsonParser, onReceiveArticle);

*/


/*
async function onLookupWord(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    const result = await lookupWord(word);
    if (!result) {
        res.sendStatus(400);
    } else {
        res.json(result);
    }
}

app.get('/lookup/:word', onLookupWord);

async function lookupWord(word) {
    const key = word.toLowerCase();
    const cursor = col.find({'word': key});
    const result = await cursor.next();
    if (!result) {
        return null;
    } else {
        return {
            word: result['word'],
            definitions: result['definitions_list']
        }
    }
}*/
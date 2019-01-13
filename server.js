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
const collection_name = 'definitions';
const cache_collection_name = 'dictionary_cache';
const mercury_cache_name = 'web_cache';
const client = new MongoClient(url);
let col = null; // collection, to be initialized
let cache_col = null;
let web_cache_col = null;

// Express Setup
const express = require('express');
const app = express();
app.use(express.static('public'));

// BodyParser Setup
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


// Wordlist Setup
const wordlist_5500 = require('./graduate_5500.json');
const set_5500 = new Set(wordlist_5500);


// Words API Meta
const wd_baseurl = 'https://wordsapiv1.p.rapidapi.com/words/';
const wd_app_key = '966008f0aamshb26b4e37b0d7392p1a2787jsn6d2648d061fc';

// This middle where sets cors in response
const cors = require('cors');

// Node implementation of fetch API
const fetch = require('node-fetch');

// Assert Library
const assert = require('assert');

// Mongoose Setup
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
})

(async function() {
    try {
        await client.connect();
        console.log('Connected correctly to database');
        const db = client.db(db_name);
        col = db.collection(collection_name);
        cache_col = db.collection(cache_collection_name);
        web_cache_col = db.collection(mercury_cache_name);
    } catch(err) {
        console.log(err.stack);
    }
})()

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
}


async function getLemma(word) {
    const sent = new CoreNLP.default.simple.Sentence(word);
    const parsetResult = await pipeline.annotate(sent);
    console.log(parsetResult.lemma(0));
    return parsetResult.lemma(0);
}


async function lookupOxford(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    const lemma = await getLemma(word);

    const cursor = cache_col.find({word: lemma});
    const result = await cursor.next();
    if (!result) {

        console.log('cache miss: ' + lemma);

        const od_res = await fetch(wd_baseurl + lemma, {method: 'GET', headers: { "X-RapidAPI-Key": wd_app_key}});
        const json = await od_res.json();
        let r = await cache_col.insertOne(json);
        assert.equal(1, r.insertedCount);
        res.json(json);

        console.log("stored into cache: " + json);
    } else {
        console.log('cache hit: ' + lemma);
        res.json(result);
    }



}


app.get('/dict/:word',cors(), lookupOxford);

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

async function onReceiveUrl(req, res) {
    const url = req.query.url;
    const cursor = web_cache_col.find({'url': url});
    const result = await cursor.next();
    let json = null;
    // console.log(result);
    if (!result) {
        console.log('web cache miss');
        const req_url = 'https://mercury.postlight.com/parser?url=' + url;
        try {
            const response = await fetch(req_url, { headers: {'Content-Type': 'application/json', 'x-api-key': 'l8akgvjMd0hVZTc0vhURx2yOvRsVi8HberbUt89q'}});
            json = await response.json();
        } catch (error) {
            console.log('encountered error, ignoring request');
        }
        const d = new Date();
        json = {...json, accessed: new MongoDB.Timestamp(0, Math.floor(new Date().getTime() / 1000))};
        web_cache_col.insertOne(json);
    } else {
        console.log('web cache hit');
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
        json = result;
    }
    res.json(json);
}


app.get('/api/webparser', cors(), onReceiveUrl);


app.listen(3000, function () {
    console.log('Server listening on port 3000');
})

client.close();
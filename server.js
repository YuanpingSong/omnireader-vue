// CoreNLP Setup
const CoreNLP = require('corenlp');
const connector = new CoreNLP.ConnectorServer({ dsn: 'http://localhost:9000' });
const props = new CoreNLP.Properties({
    annotators: 'tokenize,ssplit,pos,lemma',
});
const pipeline = new CoreNLP.Pipeline(props, 'English', connector);

// MongoDB Setup
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const db_name = 'dictionary';
const collection_name = 'definitions';
const client = new MongoClient(url);
let col = null; // collection, to be initialized

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


// Oxford Dictionary API Meta
const od_baseurl = 'https://od-api.oxforddictionaries.com/api/v1/entries/en/';
const od_app_id = '29600a63';
const od_app_key = '068306ea6dc529ff09d527ca7acdca72';

(async function() {
    try {
        await client.connect();
        console.log('Connected correctly to database');
        const db = client.db(db_name);
        col = db.collection(collection_name);
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
    return word;
}


async function lookupOxford(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    const lemma = await getLemma(word);
    const od_res = await fetch(od_baseurl + lemma, {method: 'GET', headers: {
        app_id: od_app_id, app_key: od_app_key
        }})
    const json = await od_res.json();
    res.header.
}


app.get('/dict/:word', lookupOxford);

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

app.listen(3000, function () {
    console.log('Server listening on port 3000');
})

client.close()
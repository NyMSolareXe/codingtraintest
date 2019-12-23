const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const allData = new Datastore('database.db');
allData.loadDatabase();
// allData.insert({
//     name: 'Sheefmahn',
//     status: '🌈'});

// allData.insert( {
//         name: 'Solar',
//         status: 'Sleepy'
//     });


app.get('/api', (request, response) => {
    allData.find({}, (error, data) => {
        allData.find({}, (err, data) => {
            if(err) {
                response.end();
                return;
            }
            response.json(data);
        })
    });
});


app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    allData.insert(data);
    response.json(data);
    console.log(allData);
});



// const express = require('express');
// const app = express();
// app.listen(3000, () => console.log('listening at 3000'));
// app.use(express.static('public'));
// app.use(express.json({limit: '1mb'}));

// const database = [];

// app.post('/api', (request, response) => {
//     console.log('I got a request');
//     console.log(request.body);
//     const data = request.body;
//     database.push(data);
//     console.log(database);

//     response.json({
//         status: 'success',
//         latitude: request.body.lat,
//         longitude: request.body.long
//     });
// });
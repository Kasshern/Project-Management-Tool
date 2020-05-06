import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;

app.set('port', port);

app.use(bodyParser.json());

app.use((request, response, next) => {
    console.log('Request received - processing at middleware 1');
    next();
})

const users = [{
    firstName: 'Trainer',
    batch:      '200427'
}];

/* Possible future objects:

const associates = [{
    firstName: 'Keith',
    lastName:   'Salzman'
}];

const projects = [{
    title:      'project0',
    objective:  'RESTful API'
}];

const teams = [{
    teamNumber:     'five',
    teamObjective:  'backend',
    teamLeader:     'leader'
}]
*/


// RESTful routes - Http
// GET Methods
app.get('/users', (request, response, next) => {
    console.log('Request received - processing at app.get');
    response.json(users);
    next();
})

// POST Methods
app.post('/users', (request, response, next) => {
    console.log(request.body);
    const body = request.body;
    if (body) {
        // add user to our list
        users.push(body);
    }
    console.log('Request received - processing at app.post');
    response.send('Processed by app.post');
    next();
})

// Begin listening on the designated port
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});


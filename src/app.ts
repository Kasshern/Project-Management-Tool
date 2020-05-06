import express from 'express';
import bodyParser from 'body-parser';
import { trainerRouter } from './routers/trainer-router';
import { associateRouter } from './routers/assocaigte-router';
import { teamRouter } from './routers/team-router';
import { projectRouter } from './routers/project-router';

// Initialize express app
const app = express();

// Gets port environment variable value
const port = process.env.PORT || 3000;

app.set('port', port);

// Parses body of request
app.use(bodyParser.json());

app.use((request, response, next) => {
    console.log('Request received - processing at middleware 1');
    next();
})

app.use('/trainer', trainerRouter)
app.use('/associate', associateRouter)
app.use('/team', teamRouter)
app.use('project', projectRouter)


// const users = [{
//    firstName: 'Trainer',
//    batch:      '200427'
// }];

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
*/

// Begin listening on the designated port
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});


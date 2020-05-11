import express from 'express';
import * as associateService from '../services/associate.service';

export const associateRouter = express.Router();

associateRouter.get('', (request, response, next) => {
    associateService.getAllAssociates().then(associates => {
        response.json(associates);
        next();
    }).catch(err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        response.sendStatus(500);
    });
});

associateRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    associateService.getAssociateById(id).then(associate => {
        if (!associate) {
            response.sendStatus(404);
        } else {
            response.json(associate);
        }
        next();
    }).catch(err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        response.sendStatus(500);
        next();
    });
});

associateRouter.post('', (request, response, next) => {
    const associate = request.body;
    associateService.saveAssociate(associate)
        .then(newAssociate => {
            response.status(201);
            response.json(newAssociate);
            next();
        }).catch(err => {
            // tslint:disable-next-line: no-console
            console.log(err);
            response.sendStatus(500);
            next();
        })
});


associateRouter.patch('',(request, response, next) => {
    const associate = request.body;
    associateService.patchAssociate(associate)
    .then(updatedAssociate => {
        if(updatedAssociate) {
            response.status(201);
            response.json(updatedAssociate);
            next();
        } else {
            response.sendStatus(404);
        }
    }).catch(err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        response.sendStatus(500);
    }).finally(() => {
        next();
    });
});

associateRouter.delete('/:id', (request, response, next) => {
    const id = +request.params.id;
    associateService.deleteAssociate(id).then(associate => {
        if(!associate) {
            response.status(404);
        } else {
            response.json(associate);
        }
        next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});
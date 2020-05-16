import express from 'express';
import * as associateService from '../services/associate.service';
import { Associate } from '../models/Associate';

export const associateRouter = express.Router();

associateRouter.get('', async (request, response, next) => {

    let associates: Associate[];

    try {
        associates = await associateService.getAllAssociates();
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!associates) {
        response.sendStatus(404);
    } else {
        response.json(associates);
    }
    next();
});

associateRouter.get('/:id', async (request, response, next) => {
    const id = parseInt(request.params.id);
    let associate: Associate;

    try {
        associate = await associateService.getAssociateById(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!associate) {
        response.sendStatus(404);
    } else {
        response.json(associate);
    }
    next();
});

associateRouter.post('', async (request, response, next) => {
    const associate = request.body;
    let newAssociate: Associate;

    try {
        newAssociate = await associateService.saveAssociate(associate);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (newAssociate) {
        response.status(201);
        response.json(newAssociate);
    }
    next();
});

associateRouter.patch('', async (request, response, next) => {
    const associate = request.body;
    let updatedAssociate: Associate;

    try {
        updatedAssociate = await associateService.patchAssociate(associate);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!updatedAssociate) {
        response.sendStatus(404);
    } else {
        response.status(201);
        response.json(updatedAssociate);
    }
    next();
});

associateRouter.delete('/:id', async (request, response, next) => {
    const id = parseInt(request.params.id);
    let deletedAssociate: Associate;

    try {
        deletedAssociate = await associateService.deleteAssociate(id);
    } catch (err) {
        response.sendStatus(500);
    }

    if(!deletedAssociate) {
        response.status(404);
    } else {
        response.json(deletedAssociate);
    }
    next();
});
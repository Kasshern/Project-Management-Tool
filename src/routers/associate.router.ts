import express from 'express';
import * as associateService from '../services/associate.service';
import { Associate } from '../models/Associate';
import { AssociateSkill } from '../models/AssociateSkills';
import { Skill } from '../models/Skill';

export const associateRouter = express.Router();

// Retrieves an Array of all associates
associateRouter.get('', async (request, response, next) => {
    let associates: Associate[];

    try {
        associates = await associateService.getAllAssociates();
        response.json(associates);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Retrieves a single associate object by ID
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


// Retrieves all skills belonging to an associate via associate ID
associateRouter.get('/:id/skill', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let skill: Skill[];

    try {
        skill = await associateService.getSkillsByAssociateId(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    // Dao returns undefined for non-existent associate
    if (!skill) {
        response.sendStatus(404);
    } else {
        response.json(skill);
    }
    next();
});

// Saves a new associate object
associateRouter.post('', async (request, response, next) => {
    const associate = request.body;
    let newAssociate: Associate;

    try {
        newAssociate = await associateService.saveAssociate(associate);
        response.status(201);
        response.json(newAssociate);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Creates a new associate_skill that assigns an skill to an associate
associateRouter.post('/assignSkill', async (request, response, next) => {
    const associateSkill = request.body;
    let newAssociateSkill: AssociateSkill;

    try {
        newAssociateSkill = await associateService.saveAssociateSkill(associateSkill);
        response.status(201);
        response.json(newAssociateSkill);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});


// Updates an existing associate
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
        response.status(200);
        response.json(updatedAssociate);
    }
    next();
});

// Deletes an existing associate
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
        response.status(200);
        response.json(deletedAssociate);
    }
    next();
});

// Delete an existing team assignment
associateRouter.delete('/existing/skill/:id1/associate/:id2', async (request, response, next) => {
    const id1 = parseInt(request.params.id1);
    const id2 = parseInt(request.params.id2);
    let deletedAssociateSkill: AssociateSkill;

    try {
        deletedAssociateSkill = await associateService.deleteAssociateSkill(id1, id2);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!deletedAssociateSkill) {
        response.sendStatus(404);
    } else {
        response.status(200);
        response.json(deletedAssociateSkill);
    }
    next();
});

import express from 'express';
import * as skillService from '../services/skill.service';
import { Skill } from '../models/Skill';

export const skillRouter = express.Router();

// Retrieves an Array of all skills
skillRouter.get('', async (request, response, next) => {
    let skills: Skill[];

    try {
        skills = await skillService.getAllSkills();
        response.json(skills);

    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Retrieves a single skill object by ID
skillRouter.get('/:id', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let skill: Skill;

    try {
        skill = await skillService.getSkillById(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!skill) {
        response.sendStatus(404);
    } else {
        response.json(skill);
    }
    next();
});

// Creates a new skill
skillRouter.post('', async (request, response, next) => {
    const skill = request.body;
    let newSkill: Skill;
    try {
        newSkill = await skillService.saveSkill(skill);
        response.status(201);
        response.json(newSkill);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Updates an existing skill
skillRouter.patch('', async (request, response, next) => {
    const skill = request.body;
    let updatedSkill: Skill;

    try {
    updatedSkill = await skillService.patchSkill(skill);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!updatedSkill) {
        response.sendStatus(404);
    } else {
        response.status(200);
        response.json(updatedSkill);
    }
    next();
});

// Deletes an existing skill
skillRouter.delete('/:id', async (request, response, next) => {
    const id = parseInt(request.params.id);
    let deletedSkill: Skill;

    try {
        deletedSkill = await skillService.deleteSkill(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!deletedSkill) {
        response.sendStatus(404);
    } else {
        response.status(200);
        response.json(deletedSkill);
    }
    next();
});


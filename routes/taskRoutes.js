const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Récupérer toutes les tâches
router.get('/', async (req, res) => {
    try {
        console.log('Récupération des tâches');
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Créer une nouvelle tâche
router.post('/', async (req, res) => {
    const { title, completed, forDate, untilDate, routine } = req.body;
    const task = new Task({
        title,
        completed,
        forDate,
        untilDate,
        routine
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mettre à jour une tâche (compléter ou éditer)
router.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.title = req.body.title || task.title;
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
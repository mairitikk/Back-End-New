import express from 'express';
import TodosController from '../../controllers/todos.controller.mjs';

const router = express.Router();


// Define your todo routes here
router.get('/', TodosController.getAllTodos);

router.post('/', (req, res) => {
    // ...
});



export default router;
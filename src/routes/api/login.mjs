import express from 'express';
import { login } from '../../controllers/logins.controller.mjs';

const router = express.Router();
router.post('', login)


export default router;
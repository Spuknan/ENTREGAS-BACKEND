import express from 'express';
import { getChatHistory, sendMessage } from '../../dao/mongodb/controllers/message.controller.js';

const chatRouter = express.Router();

// Rutas para el chat
chatRouter.get('/', getChatHistory);
chatRouter.post('/', sendMessage);

export default chatRouter;

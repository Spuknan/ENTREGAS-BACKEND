import express from 'express';
import apiRoutes from './api/api.routes.js';
import viewsRoutes from './views/views.routes.js';

const router = express.Router();

// Rutas para /api y /views
router.use('/api', apiRoutes);
router.use('/', viewsRoutes);

export default router;
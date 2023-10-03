import express from 'express';
const router = express.Router();
import apiRoutes from './api.routes.js';
import viewsRoutes from './views.routes.js';

router.use('/', viewsRoutes);
router.use('/api', apiRoutes);


export default router;